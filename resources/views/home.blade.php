@extends('layouts.app')

@section('content')

@foreach ( $notes as $note)
<div class="c-card">
  <div class="c-card__body">
    <div class="c-card__date">
      <div class="c-card__date__inner">
        {{ $note->month }} / {{ $note->date }}<span>{{ $note->day }}</span>
      </div>
    </div>
    <div class="c-card__text">
      <p>
        {{ $note->text }}
      </p>
    </div>
  </div>
</div>
@endforeach

@endsection