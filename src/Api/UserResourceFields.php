<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Api;

use Datlechin\Birthdays\SignUp;
use Flarum\Api\Context;
use Flarum\Api\Schema;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Symfony\Contracts\Translation\TranslatorInterface;

final class UserResourceFields
{
    public function __construct(
        private readonly SettingsRepositoryInterface $settings,
        private readonly TranslatorInterface $translator,
    ) {
    }

    public function __invoke(): array
    {
        $minAge = max(0, (int) $this->settings->get('datlechin-birthdays.min_age'));

        $canEdit = fn (User $user, Context $context) => $context->getActor()->can('editBirthday', $user);
        $canSee = fn (User $user, Context $context, bool $shown) => $shown && $user->birthday && $context->getActor()->can('viewBirthday', $user);

        return [
            // Only the owner and moderators get the full date; everyone else gets the parts the owner shows.
            Schema\Date::make('birthday')
                ->nullable()
                ->visible($canEdit)
                ->writable($canEdit)
                ->required(fn (Context $context) => $context->creating()
                    && $context->getActor()->isGuest()
                    && SignUp::fromSettings($this->settings) === SignUp::Required)
                ->beforeOrEqual($minAge > 0 ? "-$minAge years" : 'today')
                ->validationMessages([
                    'birthday.before_or_equal' => $minAge > 0
                        ? $this->translator->trans('datlechin-birthdays.api.min_age_message', ['age' => $minAge])
                        : $this->translator->trans('datlechin-birthdays.api.future_birthday_message'),
                ]),

            Schema\Str::make('birthMonthDay')
                ->visible(fn (User $user, Context $context) => $canSee($user, $context, (bool) $user->show_birthday))
                ->get(fn (User $user) => $user->birthday?->format('m-d')),

            Schema\Integer::make('age')
                ->visible(fn (User $user, Context $context) => $canSee($user, $context, (bool) $user->show_age))
                ->get(fn (User $user) => $user->birthday?->age),

            Schema\Boolean::make('showBirthday')
                ->visible($canEdit)
                ->writable($canEdit),

            Schema\Boolean::make('showAge')
                ->visible($canEdit)
                ->writable($canEdit),

            Schema\Boolean::make('canEditBirthday')
                ->get($canEdit),
        ];
    }
}
