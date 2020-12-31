<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Note;
use Faker\Generator as Faker;

$factory->define(Note::class, function (Faker $faker) {
    return [
        'text' => $faker->realText,
        'user_id' => 1,
        'created_at' => $faker->date($format = 'Y-m-d', $max = '2020-9-15',$min = '2018-03-15' ),
    ];
});
