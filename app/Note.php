<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{

  protected $fillable = ['created_at','text','user_id'];

  //アクセサ　年・月・日
  public function getYearAttribute()
  {
    return $this->created_at->year;
  }

  public function getMonthAttribute()
  {
    return $this->created_at->month;
  }

  public function getDayAttribute()
  {
    return $this->created_at->day;
  }
}
