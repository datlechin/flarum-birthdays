<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays;

use Datlechin\Birthdays\Access\UserPolicy;
use Datlechin\Birthdays\Filter\BirthdayFilter;
use Flarum\Api\Context;
use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Flarum\Extend;
use Flarum\Search\Database\DatabaseSearchDriver;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Search\UserSearcher;
use Flarum\User\User;
use Flarum\User\UserValidator;
use Symfony\Contracts\Translation\TranslatorInterface;

return [
    (new Extend\Frontend('forum'))
        ->route('/birthdays', 'birthdays')
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\ApiResource(Resource\UserResource::class))
        ->fields(fn () => [
            Schema\Str::make('birthday')
                ->visible(fn (User $user, Context $context) => $context->getActor()->can('viewBirthday', $user))
                ->writable(fn (User $user, Context $context) => $context->getActor()->can('editBirthday', $user))
                ->nullable()
                ->required(function (Context $context) {
                    $settings = resolve(SettingsRepositoryInterface::class);

                    return $context->creating()
                        && (bool) $settings->get('datlechin-birthdays.required')
                        && (bool) $settings->get('datlechin-birthdays.set_on_registration');
                })
                ->rule('nullable')
                ->rule('date')
                ->rule(function () {
                    $minAge = (int) resolve(SettingsRepositoryInterface::class)->get('datlechin-birthdays.min_age');

                    return sprintf('before:-%s years', $minAge);
                })
                ->validationMessages([
                    'birthday.required' => resolve(TranslatorInterface::class)->trans('datlechin-birthdays.api.birthday_required_message'),
                    'birthday.before' => resolve(TranslatorInterface::class)->trans('datlechin-birthdays.api.invalid_age_message', [
                        'minAge' => (int) resolve(SettingsRepositoryInterface::class)->get('datlechin-birthdays.min_age'),
                    ]),
                ])
                ->get(fn (User $user) => $user->birthday)
                ->set(function (User $user, ?string $value) {
                    $user->birthday = ($value === '' || $value === null) ? null : $value;
                }),
            Schema\Boolean::make('showDobDate')
                ->visible(fn (User $user, Context $context) => $context->getActor()->can('viewBirthday', $user))
                ->writable(fn (User $user, Context $context) => $context->getActor()->can('editBirthday', $user))
                ->get(fn (User $user) => (bool) $user->showDobDate),
            Schema\Boolean::make('showDobYear')
                ->visible(fn (User $user, Context $context) => $context->getActor()->can('viewBirthday', $user))
                ->writable(fn (User $user, Context $context) => $context->getActor()->can('editBirthday', $user))
                ->get(fn (User $user) => (bool) $user->showDobYear),
            Schema\Boolean::make('canEditOwnBirthday')
                ->visible(fn (User $user, Context $context) => $context->getActor()->can('viewBirthday', $user))
                ->get(fn (User $user, Context $context) => $context->getActor()->id === $user->id && $context->getActor()->can('editOwnBirthday', $user)),
        ]),

    (new Extend\Settings())
        ->serializeToForum('datlechin-birthdays.setBirthdayOnRegistration', 'datlechin-birthdays.set_on_registration', 'boolval')
        ->serializeToForum('datlechin-birthdays.dateFormat', 'datlechin-birthdays.date_format', 'strval')
        ->serializeToForum('datlechin-birthdays.dateNoneYearFormat', 'datlechin-birthdays.date_none_year_format', 'strval')
        ->default('datlechin-birthdays.min_age', 13),

    (new Extend\Validator(UserValidator::class))
        ->configure(AddBirthdayValidation::class),

    (new Extend\Policy())
        ->modelPolicy(User::class, UserPolicy::class),

    (new Extend\SearchDriver(DatabaseSearchDriver::class))
        ->addFilter(UserSearcher::class, BirthdayFilter::class),
];
