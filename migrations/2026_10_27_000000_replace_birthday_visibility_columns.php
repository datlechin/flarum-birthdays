<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use Illuminate\Support\Arr;

// Flarum 2 saves an API field to the snake_case column of its name, so the
// camelCase columns could be read but never written (#43). Some forums renamed
// them by hand as a workaround, so copy from whichever spelling is there.
$legacy = [
    'show_birthday' => ['showDobDate', 'show_dob_date'],
    'show_age' => ['showDobYear', 'show_dob_year'],
];

return [
    'up' => function (Builder $schema) use ($legacy) {
        $schema->table('users', function (Blueprint $table) {
            // Nullable because flarum/gdpr nulls every user column on erasure.
            $table->boolean('show_birthday')->nullable()->default(true);
            $table->boolean('show_age')->nullable()->default(false);
        });

        $db = $schema->getConnection();
        $present = [];

        foreach ($legacy as $column => $sources) {
            $sources = array_values(array_filter($sources, fn (string $source) => $schema->hasColumn('users', $source)));
            $present = [...$present, ...$sources];

            if ($source = Arr::first($sources)) {
                $db->table('users')->update([$column => $db->raw($db->getQueryGrammar()->wrap($source))]);
            }
        }

        if ($present) {
            $schema->table('users', fn (Blueprint $table) => $table->dropColumn($present));
        }
    },

    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->boolean('showDobDate')->default(true);
            $table->boolean('showDobYear')->default(true);
        });

        $db = $schema->getConnection();
        $grammar = $db->getQueryGrammar();

        $db->table('users')->update([
            'showDobDate' => $db->raw('coalesce('.$grammar->wrap('show_birthday').', 0)'),
            'showDobYear' => $db->raw('coalesce('.$grammar->wrap('show_age').', 0)'),
        ]);

        $schema->table('users', fn (Blueprint $table) => $table->dropColumn(['show_birthday', 'show_age']));
    },
];
