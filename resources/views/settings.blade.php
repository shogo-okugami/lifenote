@extends('layouts.app')

@section('title','Settings')

@section('content')

<div id="app"
 userId='@json(Auth::id())'
 isLogin='@json(Auth::check())'
 csrf='@json(csrf_token())'
 content='@json('settings')'>
</div>

@endsection
