@extends('layouts.app')

@section('content')

<div id='app'
userId='@json(Auth::id())'
isLogin='@json(Auth::check())'
csrf='@json(csrf_token())'
content='@json('note')'
note='@json($note)'
>
</div>

@endsection
