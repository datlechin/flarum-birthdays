<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Notification;

use Flarum\Database\AbstractModel;
use Flarum\Notification\AlertableInterface;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\User\User;

class BirthdayBlueprint implements BlueprintInterface, AlertableInterface
{
    public function __construct(
        public readonly User $user,
        public readonly int $year,
    ) {
    }

    public function getFromUser(): ?User
    {
        return null;
    }

    public function getSubject(): ?AbstractModel
    {
        return $this->user;
    }

    // Keyed by year so a re-run on the same day finds the existing alert instead of sending another.
    public function getData(): array
    {
        return ['year' => $this->year];
    }

    public static function getType(): string
    {
        return 'birthday';
    }

    public static function getSubjectModel(): string
    {
        return User::class;
    }
}
