<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{

    protected $fillable = [
        'color', 'font', 'darked', 'user_id',
    ];

    protected $attributes = [
        'color' => 0,
        'font' => 0,
        'darked' => false,
    ];
}
