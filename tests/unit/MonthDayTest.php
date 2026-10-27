<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Tests\unit;

use Carbon\CarbonImmutable;
use Datlechin\Birthdays\MonthDay;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

class MonthDayTest extends TestCase
{
    #[Test]
    public function a_single_day_is_just_that_day(): void
    {
        $this->assertSame(['06-05'], MonthDay::between($this->date('2026-06-05'), $this->date('2026-06-05')));
    }

    #[Test]
    public function a_range_across_new_year_keeps_its_order(): void
    {
        $this->assertSame(
            ['12-30', '12-31', '01-01', '01-02'],
            MonthDay::between($this->date('2026-12-30'), $this->date('2027-01-02')),
        );
    }

    #[Test]
    public function leap_day_birthdays_are_celebrated_on_feb_28_in_other_years(): void
    {
        $this->assertSame(['02-28', '02-29'], MonthDay::between($this->date('2026-02-28'), $this->date('2026-02-28')));
    }

    #[Test]
    public function leap_day_birthdays_wait_for_feb_29_in_a_leap_year(): void
    {
        $this->assertSame(['02-28'], MonthDay::between($this->date('2028-02-28'), $this->date('2028-02-28')));
        $this->assertSame(['02-29'], MonthDay::between($this->date('2028-02-29'), $this->date('2028-02-29')));
    }

    private function date(string $date): CarbonImmutable
    {
        return CarbonImmutable::parse($date);
    }
}
