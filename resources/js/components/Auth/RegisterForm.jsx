import React from 'react'
import { route } from '../../functions'

const RegisterForm = ({ csrf, errors }) => {

    return (
        <div className="l-wrapper__inner">
            <form method="POST" className="c-form" action={route('register')}>
                <input type='hidden' name='_token' value={csrf} />
                <div className="c-form__item">
                    <input id="email" type="email" className="c-form__input" placeholder="E-mail Adress" name="email" defaultValue='' required autoComplete="email" autoFocus />
                    <div className="c-form__message">{errors.email}</div>
                </div>
                <div className="c-form__item">
                    <input id="password" type="password" className="c-form__input" placeholder="Password" name="password" required autoComplete="current-password" />
                    <div className="c-form__message">{errors.password}</div>
                </div>
                <div className="c-form__item">
                    <input id="password-confirm" type="password" className="c-form__input" name="password_confirmation" placeholder="Password Confirm" required autoComplete="new-password" />
                </div>
                <button type="submit" className="c-btn--primary c-btn--small">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm
