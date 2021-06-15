@extends('layouts.app')

@section('title','Register')

@section('content')
<div id="app"
 isLogin='@json(Auth::check())'
 csrf='@json(csrf_token())'
 content='@json('register')'
 errors='@json($errors->toArray())'>
</div>
@endsection
