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
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

class AsksForBirthdayAtSignUpTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow('2026-06-05 12:00:00');

        $this->extension('datlechin-birthdays');
        $this->setting('allow_sign_up', true);
        $this->setting('datlechin-birthdays.min_age', 13);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    #[Test]
    public function a_required_birthday_must_be_given(): void
    {
        $this->setting('datlechin-birthdays.sign_up', 'required');

        $this->assertSame(422, $this->signUp([])->getStatusCode());
        $this->assertSame(201, $this->signUp(['birthday' => '2000-01-01'])->getStatusCode());
        $this->assertStringStartsWith('2000-01-01', $this->storedBirthday());
    }

    #[Test]
    public function an_optional_birthday_can_be_left_out(): void
    {
        $this->setting('datlechin-birthdays.sign_up', 'optional');

        $this->assertSame(201, $this->signUp([])->getStatusCode());
        $this->assertNull($this->storedBirthday());
    }

    #[Test]
    public function the_minimum_age_applies_at_sign_up(): void
    {
        $this->setting('datlechin-birthdays.sign_up', 'optional');

        $this->assertSame(422, $this->signUp(['birthday' => '2020-01-01'])->getStatusCode());
    }

    #[Test]
    public function a_birthday_is_not_accepted_when_sign_up_does_not_ask(): void
    {
        $this->setting('datlechin-birthdays.sign_up', 'off');

        $this->assertSame(403, $this->signUp(['birthday' => '2000-01-01'])->getStatusCode());
        $this->assertNull($this->storedBirthday());
    }

    private function signUp(array $attributes): ResponseInterface
    {
        return $this->send($this->request('POST', '/api/users', [
            'json' => ['data' => ['type' => 'users', 'attributes' => [
                'username' => 'newcomer',
                'email' => 'newcomer@machine.local',
                'password' => 'too-obscure',
                ...$attributes,
            ]]],
        ])->withAttribute('bypassCsrfToken', true));
    }

    private function storedBirthday(): ?string
    {
        return $this->database()->table('users')->where('username', 'newcomer')->value('birthday');
    }
}
