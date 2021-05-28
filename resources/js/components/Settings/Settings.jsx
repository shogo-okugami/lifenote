import React, { useState, useContext, useEffect } from 'react'
import { AppSettings } from '../App'
import { route } from '../../functions'
import ThemeSetting from './ThemeSetting'
import FontSetting from './FontSetting'
import DarkSetting from './DarkSettting'

const Settings = () => {
    const csrf = useContext(AppSettings).csrf
    const isDark = useContext(AppSettings).darked.isDark
    const [isOver, setIsOver] = useState(false)

return (
    <>
        <div className={'p-settings' + (isDark ? ' is-dark' : '')}>
            <ThemeSetting setIsOver={setIsOver} />
            <FontSetting setIsOver={setIsOver} />
            <DarkSetting />
            <form className='u-mb30' action={route('logout')} method='post'>
                <input type='hidden' name='_token' value={csrf} />
                <button className='c-btn--secondary'>Logout</button>
            </form>
            <button className='c-btn--danger'>Delete your account</button>
        </div>
        {isOver && <span className='c-overlay' />}
    </>
)
}

export default Settings
