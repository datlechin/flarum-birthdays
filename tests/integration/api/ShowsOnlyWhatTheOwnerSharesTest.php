<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Tests\integration\api;

use Carbon\Carbon;
use Flarum\Group\Group;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class ShowsOnlyWhatTheOwnerSharesTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow('2026-06-05 12:00:00');

        $this->extension('datlechin-birthdays');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'alice', 'birthday' => '1990-06-05', 'show_birthday' => true, 'show_age' => false],
                ['id' => 4, 'username' => 'bob', 'birthday' => '1990-06-06', 'show_birthday' => false, 'show_age' => true],
                ['id' => 5, 'username' => 'carol', 'birthday' => '1990-06-07', 'show_birthday' => true, 'show_age' => true],
            ],
            'group_permission' => [
                ['permission' => 'user.viewBirthday', 'group_id' => Group::MEMBER_ID],
            ],
        ]);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    #[Test]
    public function others_get_the_day_and_month_but_never_the_full_date(): void
    {
        $attributes = $this->attributesOf(3, 2);

        $this->assertSame('06-05', $attributes['birthMonthDay']);
        $this->assertArrayNotHasKey('birthday', $attributes);
        $this->assertArrayNotHasKey('age', $attributes);
        $this->assertArrayNotHasKey('showBirthday', $attributes);
    }

    #[Test]
    public function an_age_can_be_shown_without_the_birthday(): void
    {
        $attributes = $this->attributesOf(4, 2);

        $this->assertSame(35, $attributes['age']);
        $this->assertArrayNotHasKey('birthMonthDay', $attributes);
    }

    #[Test]
    public function nothing_is_shown_without_the_permission(): void
    {
        $attributes = $this->attributesOf(5, null);

        $this->assertArrayNotHasKey('birthMonthDay', $attributes);
        $this->assertArrayNotHasKey('age', $attributes);
    }

    #[Test]
    public function the_owner_gets_the_full_date_and_their_choices(): void
    {
        $attributes = $this->attributesOf(3, 3);

        $this->assertSame('1990-06-05', $attributes['birthday']);
        $this->assertTrue($attributes['showBirthday']);
        $this->assertFalse($attributes['showAge']);
        $this->assertTrue($attributes['canEditBirthday']);
    }

    #[Test]
    public function a_moderator_gets_the_full_date_even_when_it_is_hidden(): void
    {
        $attributes = $this->attributesOf(4, 1);

        $this->assertSame('1990-06-06', $attributes['birthday']);
        $this->assertArrayNotHasKey('birthMonthDay', $attributes);
    }

    private function attributesOf(int $userId, ?int $actorId): array
    {
        $response = $this->send($this->request('GET', "/api/users/$userId", $actorId ? ['authenticatedAs' => $actorId] : []));

        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());

        return json_decode((string) $response->getBody(), true)['data']['attributes'];
    }
}
