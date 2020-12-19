@extends('layouts.app')

@section('content')
<form class="c-form">
  <div class="c-form__item">
    <input class="c-form__input" type="date" value="{{ date('Y-m-d') }}">
  </div>
  <div class="c-form__item">
    <textarea class="c-form__textarea" rows="20" placeholder="Please write a dialry"></textarea>
  </div>
  <button type="submit" class="c-btn--primary">submit</button>
</form>
@endsection