<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{

  protected $fillable = ['created_at', 'text', 'user_id'];

  public const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  //アクセサ　年・月・日
  public function getDayAttribute()
  {
    return self::WEEKS[$this->created_at->dayOfWeek];
  }

  public function getMonthAttribute()
  {
    return $this->created_at->month;
  }

  public function getDateAttribute()
  {
    return $this->created_at->day;
  }
}
