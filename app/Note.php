<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{

    protected $fillable = ['created_at', 'text', 'user_id'];

    protected $dates = ['created_at',];

    protected $casts = [
        'created_at' => 'date:Y-m-d',
    ];
}
