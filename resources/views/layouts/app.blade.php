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
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">



  <!-- Styles -->
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
  <div id="app">
    <header id="header" class="l-header">
      <div class="l-header__inner">
        <h1 class="c-heading--large">lifenote</h1>
        <div>
          login/register
        </div>
      </div>
    </header>

    <main id="main" class="l-wrapper">
      <div id="nav" class="l-nav"></div>
      <div class="l-wrapper__inner">
        @yield('content')
      </div>
    </main>
  </div>
</body>

</html>
