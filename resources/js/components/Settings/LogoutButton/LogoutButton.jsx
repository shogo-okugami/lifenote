import React, { useContext } from 'react'
import { app } from '../../App/useApp'
import { route } from '../../../functions'

const LogoutButton = () => {

    const { csrf } = useContext(app)

    return (
        <form className='u-mb30' action={route('logout')} method='post'>
            <input type='hidden' name='_token' value={csrf} />
            <button className='c-btn--secondary'>Logout</button>
        </form>
    )
}

export default LogoutButton
