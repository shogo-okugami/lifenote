@extends('layouts.app')

@section('title','Dialry')

@section('content')
<div id="app"
 userId='@json(Auth::id())'
 isLogin='@json(Auth::check())'
 csrf='@json(csrf_token())'
 note='@json($note)'
 content='@json('dialry')'
 errors='@json($errors->toArray())'
 date='@json($date)'
 >
</div>
@endsection
