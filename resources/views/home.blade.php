@extends('layouts.app')

@section('content')

<div id="note" userId="@json(Auth::id())">
</div>

@endsection
