@extends('layouts.app')

@section('title','Login')

@section('content')
<div id="app"
 isLogin='@json(Auth::check())'
 csrf='@json(csrf_token())'
 content='@json('login')'
 errors='@json($errors->toArray())'>
</div>
@endsection
