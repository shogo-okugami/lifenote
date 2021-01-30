@extends('layouts.app')

@section('content')
<header id="header" class="l-header">
    <div class="l-header__inner">
        <h1 class="c-heading--large">lifenote</h1>
    </div>
</header>

<main id="main" class="l-wrapper">
    <div class="l-wrapper__inner--small">
        <form method="POST" class="c-form" action="{{ route('login') }}">
            @csrf
            <div class="c-form__item">
                <input id="name" type="text" class="c-form__input @error('name') is-invalid @enderror" placeholder="Name" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
                    @error('name')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
            </div>
            <div class="c-form__item">
                <input id="email" type="email" class="c-form__input @error('email') is-invalid @enderror" placeholder="E-mail Adress" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
            </div>
            <div class="c-form__item">
                <input id="password" type="password" class="c-form__input @error('password') is-invalid @enderror" placeholder="Password" name="password" required autocomplete="current-password">
                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
            </div>
            <div class="c-form__item">
                <input id="password-confirm" type="password" class="c-form__input" name="password_confirmation" placeholder="Password Confirm" required autocomplete="new-password">
            </div>
            <button type="submit" class="c-btn--primary c-btn--small">
                {{ __('Resister') }}
            </button>
        </form>
    </div>
</main>
@endsection
