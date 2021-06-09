import React from 'react'
import { route } from '../../functions'

const LoginForm = ({ csrf }) => {
    return (
        <div className="l-wrapper__inner">
            <form method="POST" className="c-form" action={route('login')}>
                <input type='hidden' name='_token' value={csrf} readOnly />
                <div className="c-form__item">
                    <input id="email" type="text" className="c-form__input @error('email') is-invalid @enderror" placeholder="E-mail Adress" name="email" defaultValue="" required />
                    <span className="invalid-feedback" role="alert">
                        <strong>{ }</strong>
                    </span>
                </div>
                <div className="c-form__item u-mb0">
                    <input id="password" type="password" className="c-form__input @error('password') is-invalid @enderror" placeholder="Password" name="password" required autoComplete="current-password" />
                    <span className="invalid-feedback" role="alert">
                        <strong>{ }</strong>
                    </span>
                </div>
                <div className="c-form__item u-mb0">
                    <div className="c-form__password__check">
                        <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                        <label className="form-check-label" htmlFor="remember">
                            Remember Me
                        </label>
                    </div>
                </div>
                <button type="submit" className="c-btn--primary c-btn--small">Login</button>
                <a className="btn btn-link" href="{{ route('password.request') }}">Forget Your Password?</a>
            </form>
        </div>
    )
}
export default LoginForm
