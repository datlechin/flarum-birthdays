<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays;

use Carbon\CarbonImmutable;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Query\Grammars;
use RuntimeException;

final class MonthDay
{
    public static function column(Builder $query, string $column): Expression
    {
        $grammar = $query->getGrammar();
        $wrapped = $grammar->wrap($column);

        return new Expression(match (true) {
            $grammar instanceof Grammars\SQLiteGrammar => "strftime('%m-%d', $wrapped)",
            $grammar instanceof Grammars\PostgresGrammar => "to_char($wrapped, 'MM-DD')",
            $grammar instanceof Grammars\MySqlGrammar => "date_format($wrapped, '%m-%d')",
            default => throw new RuntimeException('Unsupported database grammar: '.$grammar::class),
        });
    }

    public static function between(CarbonImmutable $from, CarbonImmutable $to): array
    {
        $days = [];

        for ($day = $from->startOfDay(); $day->lte($to); $day = $day->addDay()) {
            $days[] = $day->format('m-d');

            // Someone born on Feb 29 celebrates on Feb 28 in other years.
            if ($day->month === 2 && $day->day === 28 && ! $day->isLeapYear()) {
                $days[] = '02-29';
            }
        }

        return $days;
    }
}
