<?php

use Flarum\Database\Migration;

return Migration::addColumns('users', [
    'showDobDate' => ['type' => 'boolean', 'default' => true],
    'showDobYear' => ['type' => 'boolean', 'default' => true],
]);
