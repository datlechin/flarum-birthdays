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

use Flarum\Api\Context;
use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Flarum\Extend;
use Flarum\Gdpr\Extend\UserData;
use Flarum\Search\Database\DatabaseSearchDriver;
use Flarum\User\Search\UserSearcher;
use Flarum\User\User;
use Illuminate\Console\Scheduling\Event;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less')
        ->route('/birthdays', 'birthdays'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Model(User::class))
        ->cast('birthday', 'date')
        ->cast('show_birthday', 'boolean')
        ->cast('show_age', 'boolean'),

    (new Extend\Policy())
        ->modelPolicy(User::class, Access\UserPolicy::class),

    (new Extend\ApiResource(Resource\UserResource::class))
        ->fields(Api\UserResourceFields::class),

    (new Extend\ApiResource(Resource\ForumResource::class))
        ->fields(fn () => [
            Schema\Boolean::make('canViewBirthdays')
                ->get(fn ($forum, Context $context) => $context->getActor()->hasPermission('user.viewBirthday')),
        ]),

    (new Extend\SearchDriver(DatabaseSearchDriver::class))
        ->addFilter(UserSearcher::class, Search\BirthdayFilter::class),

    (new Extend\Notification())
        ->type(Notification\BirthdayBlueprint::class, ['alert']),

    (new Extend\Console())
        ->command(Console\NotifyBirthdaysCommand::class)
        ->schedule(Console\NotifyBirthdaysCommand::class, function (Event $event) {
            $event->daily();
        }),

    (new Extend\Settings())
        ->default(SignUp::SETTING, SignUp::Off->value)
        ->default('datlechin-birthdays.min_age', 13)
        ->serializeToForum('datlechin-birthdays.signUp', SignUp::SETTING)
        ->serializeToForum('datlechin-birthdays.minAge', 'datlechin-birthdays.min_age', 'intval'),

    (new Extend\Conditional())
        ->whenExtensionEnabled('flarum-gdpr', fn () => [
            (new UserData())->addPiiKeysForSerialization('birthday'),
        ]),
];
