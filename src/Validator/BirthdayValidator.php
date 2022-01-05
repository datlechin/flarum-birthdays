<?php

namespace Datlechin\Birthdays\Validator;

use Flarum\Foundation\AbstractValidator;

class BirthdayValidator extends AbstractValidator
{
    /**
     * @var array
     */
    protected $rules = [
        'birthday' => [
            'required',
            'date_format:Y-m-d',
            'before:today',
        ],
    ];
}
