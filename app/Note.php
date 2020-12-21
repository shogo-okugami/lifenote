<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{

  protected $fillable = ['created_at','text'];
  
  public $dt; //日記投稿日

  public function __construct(array $attributes = [])
  {
    parent::__construct($attributes);
    
    $this->dt = new Carbon($this->created_at);
  }

  //アクセサ　年・月・日
  public function getYearAttribute()
  {
    return $this->dt->year;
  }

  public function getMonthAttribute()
  {
    return $this->dt->month;
  }

  public function getDayAttribute()
  {
    return $this->dt->day;
  }
}
