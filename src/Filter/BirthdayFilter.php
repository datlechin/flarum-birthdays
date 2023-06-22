<?php

namespace Datlechin\Birthdays\Filter;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;

class BirthdayFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'birthday';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate): void
    {
        $birthday = date('m-d', strtotime($filterValue));

        $filterState->getQuery()->whereRaw("DATE_FORMAT(birthday, '%m-%d') = ?", [$birthday]);
    }
}
