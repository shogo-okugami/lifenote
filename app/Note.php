<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{

    protected $fillable = ['date', 'text', 'user_id'];

    protected $casts = ['date' => 'date:Y/m/d',];
}
