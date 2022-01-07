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

use Datlechin\Birthdays\AddBirthdayValidation;
use Datlechin\Birthdays\Access\UserPolicy;
use Datlechin\Birthdays\Listeners\AddUserBirthdayAttribute;
use Datlechin\Birthdays\Listeners\SaveUserBirthday;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\User\Event\Saving;
use Flarum\User\User;
use Flarum\User\UserValidator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Event())
        ->listen(Saving::class, SaveUserBirthday::class)
        ->listen(Saving::class, SaveBirthdayToDatabase::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(AddUserBirthdayAttribute::class),

    (new Extend\Settings())
        ->serializeToForum('setBirthdayOnRegistration', 'datlechin-birthdays.set_on_registration', 'boolval'),

    (new Extend\Validator(UserValidator::class))
        ->configure(AddBirthdayValidation::class),

    (new Extend\Policy())
        ->modelPolicy(User::class, UserPolicy::class)
];
