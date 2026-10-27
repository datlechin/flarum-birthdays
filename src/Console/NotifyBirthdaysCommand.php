<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Console;

use Carbon\CarbonImmutable;
use Datlechin\Birthdays\MonthDay;
use Datlechin\Birthdays\Notification\BirthdayBlueprint;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\User;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;

class NotifyBirthdaysCommand extends Command
{
    protected $signature = 'birthdays:notify';

    protected $description = 'Wish a happy birthday to everyone whose birthday is today.';

    public function handle(NotificationSyncer $notifications): int
    {
        $today = CarbonImmutable::today();
        $query = User::query()->whereNotNull('birthday');
        $count = 0;

        $query
            ->whereIn(MonthDay::column($query->getQuery(), 'birthday'), MonthDay::between($today, $today))
            ->chunkById(100, function (Collection $users) use ($notifications, $today, &$count) {
                foreach ($users as $user) {
                    $notifications->sync(new BirthdayBlueprint($user, $today->year), [$user]);
                    $count++;
                }
            });

        $this->info("Sent $count birthday notifications.");

        return self::SUCCESS;
    }
}
