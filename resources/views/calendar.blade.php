@extends('layouts.app')

@section('content')

<div id="app"
userId='@json(Auth::id())'
isLogin='@json(Auth::check())'
content='@json('calendar')'>
</div>

@endsection
