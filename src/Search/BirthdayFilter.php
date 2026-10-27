<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Search;

use Carbon\CarbonImmutable;
use DateTimeImmutable;
use Datlechin\Birthdays\MonthDay;
use Flarum\Foundation\ValidationException;
use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;
use Flarum\Search\ValidateFilterTrait;
use Illuminate\Database\Eloquent\Builder;
use Symfony\Contracts\Translation\TranslatorInterface;

/** @implements FilterInterface<DatabaseSearchState> */
class BirthdayFilter implements FilterInterface
{
    use ValidateFilterTrait;

    public const MAX_DAYS = 31;

    public function __construct(
        private readonly TranslatorInterface $translator,
    ) {
    }

    public function getFilterKey(): string
    {
        return 'birthday';
    }

    public function filter(SearchState $state, string|array $value, bool $negate): void
    {
        $query = $state->getQuery();

        if (! $state->getActor()->hasPermission('user.viewBirthday')) {
            $query->whereRaw('1 = 0');

            return;
        }

        $days = $this->days($this->asString($value));
        $monthDay = MonthDay::column($query->getQuery(), 'users.birthday');

        $constraint = fn (Builder $query) => $query->where('users.show_birthday', true)->whereIn($monthDay, $days);

        if ($negate) {
            $query->whereNot($constraint);

            return;
        }

        $query->where($constraint);

        // Soonest first, so a range across New Year keeps December ahead of January.
        $state->setDefaultSort(function (Builder $query) use ($monthDay, $days) {
            $cases = implode(' ', array_map(fn (int $position) => "when ? then $position", array_keys($days)));

            $query
                ->orderByRaw('case '.$monthDay->getValue($query->getQuery()->getGrammar())." $cases end", $days)
                ->orderBy('users.username');
        });
    }

    private function days(string $value): array
    {
        $dates = array_map($this->date(...), explode('..', $value, 2));

        $from = $dates[0];
        $to = $dates[1] ?? $from;

        if (! $from || ! $to || $to->lt($from) || $from->diffInDays($to) >= self::MAX_DAYS) {
            throw new ValidationException([
                'message' => $this->translator->trans('datlechin-birthdays.api.invalid_birthday_filter_message', ['max' => self::MAX_DAYS]),
            ]);
        }

        return MonthDay::between($from, $to);
    }

    private function date(string $value): ?CarbonImmutable
    {
        $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);

        return $date && $date->format('Y-m-d') === $value ? CarbonImmutable::instance($date) : null;
    }
}
