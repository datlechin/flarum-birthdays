<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $settings = fn () => $schema->getConnection()->table('settings');
        $value = fn (string $key) => $settings()->where('key', "datlechin-birthdays.$key")->value('value');

        if ($value('set_on_registration')) {
            $settings()->updateOrInsert(
                ['key' => 'datlechin-birthdays.sign_up'],
                ['value' => $value('required') ? 'required' : 'optional'],
            );
        }

        $settings()->whereIn('key', [
            'datlechin-birthdays.set_on_registration',
            'datlechin-birthdays.required',
            'datlechin-birthdays.date_format',
            'datlechin-birthdays.date_none_year_format',
        ])->delete();
    },

    'down' => function (Builder $schema) {
        $settings = fn () => $schema->getConnection()->table('settings');
        $signUp = $settings()->where('key', 'datlechin-birthdays.sign_up')->value('value');

        if (in_array($signUp, ['optional', 'required'], true)) {
            $settings()->insert([
                ['key' => 'datlechin-birthdays.set_on_registration', 'value' => '1'],
                ['key' => 'datlechin-birthdays.required', 'value' => $signUp === 'required' ? '1' : '0'],
            ]);
        }

        $settings()->where('key', 'datlechin-birthdays.sign_up')->delete();
    },
];
