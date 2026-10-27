<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Datlechin\Birthdays\Tests\integration;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use PHPUnit\Framework\Attributes\Test;

class UpgradesFromVersionTwoTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('datlechin-birthdays');

        $this->prepareDatabase([
            'users' => [
                [...$this->normalUser(), 'birthday' => '1990-06-05'],
            ],
        ]);
    }

    #[Test]
    public function the_old_visibility_choices_carry_over(): void
    {
        $this->restoreVersionTwoColumns(['showDobDate' => false, 'showDobYear' => true]);

        $this->migrate('2026_10_27_000000_replace_birthday_visibility_columns');

        $user = $this->database()->table('users')->where('id', 2)->first();

        $this->assertFalse((bool) $user->show_birthday);
        $this->assertTrue((bool) $user->show_age);
        $this->assertFalse($this->schema()->hasColumn('users', 'showDobDate'));
    }

    #[Test]
    public function a_forum_that_added_snake_case_columns_by_hand_keeps_the_camel_case_values(): void
    {
        // The workaround posted on #43 left both spellings, with the real values in camelCase.
        $this->restoreVersionTwoColumns(['showDobDate' => false, 'showDobYear' => true, 'show_dob_date' => true, 'show_dob_year' => false]);

        $this->migrate('2026_10_27_000000_replace_birthday_visibility_columns');

        $user = $this->database()->table('users')->where('id', 2)->first();

        $this->assertFalse((bool) $user->show_birthday);
        $this->assertTrue((bool) $user->show_age);
        $this->assertFalse($this->schema()->hasColumn('users', 'show_dob_date'));
    }

    #[Test]
    public function the_two_sign_up_switches_become_one_choice(): void
    {
        $this->database()->table('settings')->insert([
            ['key' => 'datlechin-birthdays.set_on_registration', 'value' => '1'],
            ['key' => 'datlechin-birthdays.required', 'value' => '1'],
            ['key' => 'datlechin-birthdays.date_format', 'value' => 'LL'],
        ]);

        $this->migrate('2026_10_27_000001_merge_birthday_sign_up_settings');

        $settings = $this->database()->table('settings')->where('key', 'like', 'datlechin-birthdays.%')->pluck('value', 'key')->all();

        $this->assertSame(['datlechin-birthdays.sign_up' => 'required'], $settings);
    }

    private function restoreVersionTwoColumns(array $values): void
    {
        $this->schema()->table('users', function (Blueprint $table) use ($values) {
            $table->dropColumn(['show_birthday', 'show_age']);

            foreach (array_keys($values) as $column) {
                $table->boolean($column)->default(true);
            }
        });

        $this->database()->table('users')->where('id', 2)->update($values);
    }

    private function migrate(string $name): void
    {
        $migration = require __DIR__."/../../migrations/$name.php";

        $migration['up']($this->schema());
    }

    private function schema(): Builder
    {
        return $this->database()->getSchemaBuilder();
    }
}
