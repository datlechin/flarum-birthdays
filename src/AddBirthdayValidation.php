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
use Flarum\User\UserValidator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Symfony\Contracts\Translation\TranslatorInterface;

class AddBirthdayValidation
{
    public function __construct(
        protected TranslatorInterface $translator,
        protected SettingsRepositoryInterface $settings
    ) {}

    public function __invoke(UserValidator $flarumValidator, Validator $validator): void
    {
        $rules = $validator->getRules();

        $isRequired = $this->settings->get('datlechin-birthdays.required')
            && $this->settings->get('datlechin-birthdays.set_on_registration');

        $rules['birthday'] = [
            'sometimes',
            Rule::when($isRequired && ! $flarumValidator->getUser(), 'required', 'nullable'),
            'date',
            sprintf('before:-%s years', (int) $this->settings->get('datlechin-birthdays.min_age')),
        ];

        $validator->setRules($rules);

        $validator->setCustomMessages([
            ...$validator->customMessages,
            'birthday.before' => $this->translator->trans('datlechin-birthdays.api.invalid_age_message', [
                'minAge' => (int) $this->settings->get('datlechin-birthdays.min_age')
            ]),
        ]);
    }
}
