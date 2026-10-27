<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Access;

use Datlechin\Birthdays\SignUp;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function __construct(
        private readonly SettingsRepositoryInterface $settings,
    ) {
    }

    public function viewBirthday(User $actor, User $user): ?string
    {
        if ($actor->hasPermission('user.viewBirthday') || ($user->exists && $actor->id === $user->id)) {
            return $this->allow();
        }

        return null;
    }

    public function editBirthday(User $actor, User $user): ?string
    {
        if ($actor->isGuest()) {
            return ! $user->exists && SignUp::fromSettings($this->settings) !== SignUp::Off ? $this->allow() : null;
        }

        if ($actor->id === $user->id && $actor->hasPermission('user.editOwnBirthday')) {
            return $this->allow();
        }

        if ($actor->can('edit', $user)) {
            return $this->allow();
        }

        return null;
    }
}
