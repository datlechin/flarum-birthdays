<?php

namespace Datlechin\Birthdays\Access;

use Carbon\Carbon;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function __construct(protected SettingsRepositoryInterface $settings) {}

    public function viewBirthday(User $actor, User $user): string
    {
        if (! $actor->hasPermission('user.editOwnBirthday') && $this->isSuspended($user)) {
            return $this->deny();
        }

        if (
            ($actor->id === $user->id && $actor->hasPermission('user.editOwnBirthday'))
            || $actor->hasPermission('user.viewBirthday')
        ) {
            return $this->allow();
        }

        return $this->deny();
    }

    public function editBirthday(User $actor, User $user): string
    {
        if ($actor->isGuest() && !$user->exists || $this->settings->get('datlechin-birthdays.set_on_registration')) {
            return $this->allow();
        } elseif ($user->id === $actor->id && $actor->hasPermission('user.editOwnBirthday') && !$this->isSuspended($user)) {
            return $this->allow();
        } elseif ($actor->can('edit', $user)) {
            return $this->allow();
        }

        return $this->deny();
    }

    protected function isSuspended(User $user): bool
    {
        return $user->suspended_until !== null
            && $user->suspended_until instanceof Carbon
            && $user->suspended_until->isFuture();
    }
}
