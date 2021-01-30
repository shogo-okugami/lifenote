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
                <input id="email" type="email" class="c-form__input @error('email') is-invalid @enderror" placeholder="E-mail Adress" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
            </div>
            <div class="c-form__item u-mb0">
                <input id="password" type="password" class="c-form__input @error('password') is-invalid @enderror" placeholder="Password" name="password" required autocomplete="current-password">
                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
            </div>
            <div class="c-form__item u-mb0">
                <div class="c-form__password__check">
                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <label class="form-check-label" for="remember">
                            {{ __('Remember Me') }}
                        </label>
                </div>
            </div>
            <button type="submit" class="c-btn--primary c-btn--small">
                {{ __('Login') }}
            </button>
            @if (Route::has('password.request'))
                <a class="btn btn-link" href="{{ route('password.request') }}">
                    {{ __('Forgot Your Password?') }}
                </a>
            @endif
        </form>
    </div>
</main>
@endsection
