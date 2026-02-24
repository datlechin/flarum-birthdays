<?php

namespace Datlechin\Birthdays\Filter;

use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;

/**
 * @implements FilterInterface<DatabaseSearchState>
 */
class BirthdayFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'birthday';
    }

    public function filter(SearchState $state, string|array $value, bool $negate): void
    {
        $birthday = date('m-d', strtotime(is_array($value) ? $value[0] : $value));

        $state->getQuery()->whereRaw("DATE_FORMAT(birthday, '%m-%d') = ?", [$birthday]);
    }
}
