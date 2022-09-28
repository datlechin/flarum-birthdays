<?php

namespace Datlechin\Birthdays\Filter;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;

class BirthdayFilter implements FilterInterface
{

    /**
     * @return string
     */
    public function getFilterKey(): string
    {
        return 'birthday';
    }

    /**
     * @param FilterState $filterState
     * @param string $filterValue
     * @param bool $negate
     * @return void
     */
    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $filterState->getQuery()->where('birthday', $negate ? '!=' : '=', $filterValue);
    }
}
