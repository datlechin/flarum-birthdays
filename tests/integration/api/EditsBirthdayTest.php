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
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

class EditsBirthdayTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('datlechin-birthdays');

        $this->prepareDatabase([
            User::class => [
                [...$this->normalUser(), 'birthday' => '1990-06-05'],
                ['id' => 3, 'username' => 'alice', 'birthday' => '1985-01-01'],
            ],
        ]);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    #[Test]
    public function a_member_can_hide_their_birthday_and_show_their_age(): void
    {
        // #43: both switches used to fail with a database error.
        $response = $this->patch(2, 2, ['showBirthday' => false, 'showAge' => true]);

        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());

        $user = $this->database()->table('users')->where('id', 2)->first();

        $this->assertFalse((bool) $user->show_birthday);
        $this->assertTrue((bool) $user->show_age);
    }

    #[Test]
    public function a_member_can_change_and_remove_their_birthday(): void
    {
        $this->assertSame(200, $this->patch(2, 2, ['birthday' => '1991-07-06'])->getStatusCode());
        $this->assertStringStartsWith('1991-07-06', $this->storedBirthday(2));

        $this->assertSame(200, $this->patch(2, 2, ['birthday' => null])->getStatusCode());
        $this->assertNull($this->storedBirthday(2));
    }

    #[Test]
    public function a_birthday_under_the_minimum_age_is_refused(): void
    {
        Carbon::setTestNow('2026-06-05 12:00:00');
        $this->setting('datlechin-birthdays.min_age', 13);

        $this->assertSame(422, $this->patch(2, 2, ['birthday' => '2014-06-05'])->getStatusCode());
        $this->assertSame(200, $this->patch(2, 2, ['birthday' => '2013-06-05'])->getStatusCode());
    }

    #[Test]
    public function a_birthday_in_the_future_is_refused_without_a_minimum_age(): void
    {
        Carbon::setTestNow('2026-06-05 12:00:00');
        $this->setting('datlechin-birthdays.min_age', 0);

        $this->assertSame(422, $this->patch(2, 2, ['birthday' => '2026-06-06'])->getStatusCode());
        $this->assertSame(200, $this->patch(2, 2, ['birthday' => '2026-06-05'])->getStatusCode());
    }

    #[Test]
    public function a_member_cannot_change_someone_elses_birthday(): void
    {
        $response = $this->patch(2, 3, ['birthday' => '2000-01-01']);

        $this->assertSame(403, $response->getStatusCode());
        $this->assertStringStartsWith('1985-01-01', $this->storedBirthday(3));
    }

    #[Test]
    public function a_moderator_can_change_someone_elses_birthday(): void
    {
        $this->assertSame(200, $this->patch(1, 3, ['birthday' => '2000-01-01'])->getStatusCode());
        $this->assertStringStartsWith('2000-01-01', $this->storedBirthday(3));
    }

    private function patch(int $actorId, int $userId, array $attributes): ResponseInterface
    {
        return $this->send($this->request('PATCH', "/api/users/$userId", [
            'authenticatedAs' => $actorId,
            'json' => ['data' => ['type' => 'users', 'id' => (string) $userId, 'attributes' => $attributes]],
        ]));
    }

    private function storedBirthday(int $userId): ?string
    {
        return $this->database()->table('users')->where('id', $userId)->value('birthday');
    }
}
