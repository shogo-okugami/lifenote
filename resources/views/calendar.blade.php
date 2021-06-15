@extends('layouts.app')

@section('title','Calendar')

@section('content')

<div id="app"
userId='@json(Auth::id())'
isLogin='@json(Auth::check())'
content='@json('calendar')'
notes='@json($notes)'
csrf='@json(csrf_token())'
errors='@json($errors->toArray())'
date='@json(date('Y-m-d'))'>
</div>

@endsection
