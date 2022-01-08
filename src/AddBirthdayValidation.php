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
use Symfony\Contracts\Translation\TranslatorInterface;

class AddBirthdayValidation
{
    /**
     * @var TranslatorInterface
     */
    protected $translator;


    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * @param Validator $validator
     */
    public function __invoke($flarumValidator, Validator $validator)
    {
        $rules = $validator->getRules();

        $rules['birthday'] = [
            'nullable',
            'date_format:Y-m-d',
            function ($attribute, $value, $fail) {
                if ($value) {
                    $birthday = new \DateTime($value);
                    $now = new \DateTime();
                    $diff = $now->diff($birthday);
                    if ($diff->y > 100) {
                        $fail($this->translator->trans('datlechin-birthdays.api.invalid_dob_message'));
                    }
                }
            },
            'before:today'
        ];

        $validator->setRules($rules);
    }
}
