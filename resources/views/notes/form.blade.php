@extends('layouts.app')

@section('content')
<form class="c-form" method="post" action="{{ route('notes.store') }}">
  @csrf
  <div class="c-form__item">
    <input id="js-input-date" name="created_at" class="c-form__input js-flatpickr" value="{{ date('Y-m-d') }}">
  </div>
  <div class="c-form__item">
    <textarea name="text" class="c-form__textarea" rows="18" placeholder="Please write a dialry"></textarea>
    @error('text')
      <div class="c-form__message">{{ $message }}</div>
    @enderror
  </div>
  <button type="submit" class="c-btn--primary">submit</button>
</form>
@endsection