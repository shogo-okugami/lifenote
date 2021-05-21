import React, { useState } from 'react'
import { route } from '../functions'
import ThemeSetting from './ThemeSetting'
import ToggleDarkButton from './ToggleDarkButton'

const Settings = ({ isDark, setIsDark, setTheme, getTheme, mediaScreenL, csrf }) => {

    const [isOver, setIsOver] = useState(false)

    return (
        <>
            <div className={'p-settings' + (isDark ? ' is-dark' : '')}>
                <ThemeSetting isDark={isDark} setTheme={setTheme} getTheme={getTheme} isOver={isOver} setIsOver={setIsOver} />
                <div className={'p-settings__group'}>
                    <h2 className={isDark ? ' is-dark' : ''}>Font</h2>
                    <div className='p-settings__item'>
                        <p>current font</p>
                        <button className='p-settings__btn'>select font</button>
                    </div>
                </div>
                <div className={'p-settings__group'}>
                    <h2 className={isDark ? ' is-dark' : ''}>Dark mode</h2>
                    <div className='p-settings__item'>
                        <p>dark mode</p>
                        <ToggleDarkButton isDark={isDark} setIsDark={setIsDark} />
                    </div>
                </div>
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
