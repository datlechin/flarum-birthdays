<?php

namespace Datlechin\Birthdays\Access;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function editBirthday(User $actor, User $user)
    {
        if ($actor->isGuest() && !$user->exists || $this->settings->get('datlechin-birthdays.set_on_registration')) {
            return $this->allow();
        } else if ($user->id === $actor->id && $actor->hasPermission('user.editOwnBirthday')) {
            return $this->allow();
        } else if ($actor->can('edit', $user)) {
            return $this->allow();
        }
    }
}
