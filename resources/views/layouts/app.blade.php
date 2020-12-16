<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Scripts -->
  <script src="{{ asset('js/app.js') }}" defer></script>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

  <!-- Styles -->
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
  <div id="app">
    <header class="l-header">
      <div class="l-header__inner">
        <h1 class="c-heading--large">lifenote</h1>
        <div>
          login/register
        </div>
      </div>
    </header>

    <main class="l-wrapper">
      <nav class="l-nav">
        <ul class="c-list">
          <li class="c-list__item"><a href="{{ route('home') }}">home</a></li>
          <li class="c-list__item"><a>calendar</a></li>
          <li class="c-list__item"><a href="{{ route('notes.create') }}">dialry</a></li>
          <li class="c-list__item"><a>logout</a></li>
        </ul>
      </nav>
      <div class="l-wrapper__inner">
        @yield('content')
      </div>
    </main>
  </div>
</body>

</html>