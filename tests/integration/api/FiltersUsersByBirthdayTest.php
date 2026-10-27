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

use Flarum\Group\Group;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

class FiltersUsersByBirthdayTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('datlechin-birthdays');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'january', 'birthday' => '1990-01-01'],
                ['id' => 4, 'username' => 'december', 'birthday' => '1985-12-31'],
                ['id' => 5, 'username' => 'second', 'birthday' => '2000-01-02'],
                ['id' => 6, 'username' => 'hidden', 'birthday' => '1990-01-01', 'show_birthday' => false],
                ['id' => 7, 'username' => 'leap', 'birthday' => '1996-02-29'],
            ],
            'group_permission' => [
                ['permission' => 'searchUsers', 'group_id' => Group::GUEST_ID],
                ['permission' => 'searchUsers', 'group_id' => Group::MEMBER_ID],
                ['permission' => 'user.viewBirthday', 'group_id' => Group::MEMBER_ID],
            ],
        ]);
    }

    #[Test]
    public function a_range_across_new_year_lists_the_soonest_first(): void
    {
        $this->assertSame(['december', 'january', 'second'], $this->usernames('2026-12-31..2027-01-02'));
    }

    #[Test]
    public function members_who_hide_their_birthday_are_left_out(): void
    {
        $this->assertSame(['january'], $this->usernames('2027-01-01'));
    }

    #[Test]
    public function a_leap_day_birthday_is_listed_on_feb_28_in_other_years(): void
    {
        $this->assertSame(['leap'], $this->usernames('2026-02-28'));
        $this->assertSame([], $this->usernames('2028-02-28'));
        $this->assertSame(['leap'], $this->usernames('2028-02-29'));
    }

    #[Test]
    public function nobody_is_listed_without_the_permission(): void
    {
        $this->assertSame([], $this->usernames('2027-01-01', null));
    }

    #[Test]
    public function a_value_that_is_not_a_date_range_is_refused(): void
    {
        $this->assertSame(422, $this->filter('tomorrow')->getStatusCode());
        $this->assertSame(422, $this->filter('2026-02-30')->getStatusCode());
        $this->assertSame(422, $this->filter('2026-06-05..2026-06-01')->getStatusCode());
        $this->assertSame(422, $this->filter('2026-01-01..2026-12-31')->getStatusCode());
    }

    private function usernames(string $value, ?int $actorId = 2): array
    {
        $response = $this->filter($value, $actorId);

        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());

        return array_map(
            fn (array $user) => $user['attributes']['username'],
            json_decode((string) $response->getBody(), true)['data'],
        );
    }

    private function filter(string $value, ?int $actorId = 2): ResponseInterface
    {
        return $this->send(
            $this->request('GET', '/api/users', $actorId ? ['authenticatedAs' => $actorId] : [])
                ->withQueryParams(['filter' => ['birthday' => $value]])
        );
    }
}
