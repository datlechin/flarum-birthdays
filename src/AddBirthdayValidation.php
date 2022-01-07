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

use Illuminate\Validation\Validator;

class AddBirthdayValidation
{
    /**
     * @param Validator $validator
     */
    public function __invoke($flarumValidator, Validator $validator)
    {
        $rules = $validator->getRules();

        $rules['birthday'] = [
            'nullable',
            'date_format:Y-m-d',
            'before:today',
        ];

        $validator->setRules($rules);
    }
}
