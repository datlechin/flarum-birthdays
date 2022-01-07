<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Listeners;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveUserBirthday
{
    /**
     * Handle the event.
     *
     * @param Saving $event
     */
    public function handle(Saving $event)
    {
        $user = $event->user;
        $data = $event->data;

        $attributes = Arr::get($data, 'attributes', []);

        if (isset($attributes['showDobDate'])) {
            $user->showDobDate = $attributes['showDobDate'];
            $user->save();
        } else if (isset($attributes['showDobYear'])) {
            $user->showDobYear = $attributes['showDobYear'];
            $user->save();
        }
    }
}
