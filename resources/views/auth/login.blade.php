@extends('layouts.app')

@section('content')
<div id="app"
 isLogin='@json(Auth::check())'
 csrf='@json(csrf_token())'
 content='@json('login')'
 errors='@json($errors->toArray())'>
</div>
@endsection
