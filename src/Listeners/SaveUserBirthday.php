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

use Datlechin\Birthdays\Validator\BirthdayValidator;
use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveUserBirthday
{
    /**
     * @var BirthdayValidator
     */
    protected $validator;

    /**
     * @param BirthdayValidator $validator
     */
    public function __construct(BirthdayValidator $validator)
    {
        $this->validator = $validator;
    }

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

        if (isset($attributes)) {
            $this->validator->assertValid(['birthday' => $attributes['birthday']]);
            $user->birthday = $attributes['birthday'];
            $user->showDobDate = $attributes['showDobDate'];
            $user->showDobYear = $attributes['showDobYear'];

            $user->save();
        }
    }
}
