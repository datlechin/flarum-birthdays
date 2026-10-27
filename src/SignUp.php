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

use Flarum\Settings\SettingsRepositoryInterface;

enum SignUp: string
{
    public const SETTING = 'datlechin-birthdays.sign_up';

    case Off = 'off';
    case Optional = 'optional';
    case Required = 'required';

    public static function fromSettings(SettingsRepositoryInterface $settings): self
    {
        return self::tryFrom((string) $settings->get(self::SETTING)) ?? self::Off;
    }
}
