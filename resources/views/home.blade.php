@extends('layouts.app')

@section('title','Home')

@section('content')

<div id="app"
 userId='@json(Auth::id())'
 isLogin='@json(Auth::check())'
 csrf='@json(csrf_token())'
 notes='@json($notes)'
 content='@json('notes')'>
</div>

@endsection
