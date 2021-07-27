import React, { useContext } from 'react'
import { route } from '../../functions'
import { app } from '../App/useApp'

const LoginForm = ({ errors }) => {

    const { csrf } = useContext(app)

    return (
        <div className="l-wrapper__inner">
            <form method="POST" className="c-form" action={route('login')}>
                <input type='hidden' name='_token' value={csrf} readOnly />
                <div className="c-form__item">
                    <input id="email" type="text" className="c-form__input" placeholder="E-mail Adress" name="email" defaultValue="" required />
                    <div className="c-form__message">{errors.email}</div>
                </div>
                <div className="c-form__item u-mb0">
                    <input id="password" type="password" className="c-form__input" placeholder="Password" name="password" required autoComplete="current-password" />
                    <div className="c-form__message"></div>
                </div>
                <div className="c-form__item u-mb0">
                    <div className="c-form__password__check">
                        <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                        <label className="form-check-label" htmlFor="remember">
                            Remember Me
                        </label>
                    </div>
                </div>
                <button type="submit" className="c-btn--primary c-btn--small u-mb15">Login</button>
                <a className="c-form__link u-mb15" href="">Forget Your Password?</a>
                <a className="c-form__link" href={route('register')}>Create Your Account</a>
            </form>
        </div>
    )
}
export default LoginForm
