<!DOCTYPE html>

<head>
 <meta charset="utf-8">
 <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
  <h1>{{ $sample }}だよ</h1>
  
  <div id="example"></div>
  <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>