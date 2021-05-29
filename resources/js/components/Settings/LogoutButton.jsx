import React, { useContext } from 'react'
import { AppSettings } from '../App'
import { route } from '../../functions'

const LogoutButton = () => {

    const csrf = useContext(AppSettings).csrf

    return (
        <form className='u-mb30' action={route('logout')} method='post'>
            <input type='hidden' name='_token' value={csrf} />
            <button className='c-btn--secondary'>Logout</button>
        </form>
    )
}

export default LogoutButton
