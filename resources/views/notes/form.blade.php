@extends('layouts.app')

@section('content')
<div id="app"
 userId='@json(Auth::id())'
 isLogin='@json(Auth::check())'
 csrf='@json(csrf_token())'
 content='@json('dialry')'
 errors='@json($errors->toArray())'
 date='@json(date('Y-m-d'))'
 >
</div>
@endsection
