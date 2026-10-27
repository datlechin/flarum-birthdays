<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Tests\integration\console;

use Carbon\Carbon;
use Flarum\Testing\integration\ConsoleTestCase;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class NotifiesBirthdaysTest extends ConsoleTestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('datlechin-birthdays');

        $this->prepareDatabase([
            User::class => [
                [...$this->normalUser(), 'birthday' => '1990-06-05'],
                ['id' => 3, 'username' => 'tomorrow', 'birthday' => '1990-06-06'],
                ['id' => 4, 'username' => 'private', 'birthday' => '1990-06-05', 'show_birthday' => false],
                ['id' => 5, 'username' => 'leap', 'birthday' => '1996-02-29'],
            ],
        ]);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    #[Test]
    public function everyone_whose_birthday_is_today_is_wished_a_happy_birthday(): void
    {
        Carbon::setTestNow('2026-06-05 00:05:00');

        $this->runCommand(['command' => 'birthdays:notify']);

        // Hiding a birthday from others doesn't stop the greeting to yourself.
        $this->assertSame([2, 4], $this->notifiedUserIds());
    }

    #[Test]
    public function running_twice_on_the_same_day_sends_nothing_new(): void
    {
        Carbon::setTestNow('2026-06-05 00:05:00');

        $this->runCommand(['command' => 'birthdays:notify']);
        $this->runCommand(['command' => 'birthdays:notify']);

        $this->assertSame([2, 4], $this->notifiedUserIds());
    }

    #[Test]
    public function the_next_year_brings_a_new_greeting(): void
    {
        Carbon::setTestNow('2026-06-05 00:05:00');
        $this->runCommand(['command' => 'birthdays:notify']);

        Carbon::setTestNow('2027-06-05 00:05:00');
        $this->runCommand(['command' => 'birthdays:notify']);

        $this->assertSame([2, 2, 4, 4], $this->notifiedUserIds());
    }

    #[Test]
    public function a_leap_day_birthday_is_greeted_on_feb_28_in_other_years(): void
    {
        Carbon::setTestNow('2026-02-28 00:05:00');

        $this->runCommand(['command' => 'birthdays:notify']);

        $this->assertSame([5], $this->notifiedUserIds());
    }

    private function notifiedUserIds(): array
    {
        return $this->database()->table('notifications')
            ->where('type', 'birthday')
            ->orderBy('user_id')
            ->pluck('user_id')
            ->map(fn ($id) => (int) $id)
            ->all();
    }
}
