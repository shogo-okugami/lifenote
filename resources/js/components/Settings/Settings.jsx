import React, { useState, useContext, useEffect } from 'react'
import { AppSettings } from '../App'
import ThemeSetting from './ThemeSetting'
import FontSetting from './FontSetting'
import DarkSetting from './DarkSettting'
import DeleteAccount from './DeleteAccount'
import LogoutButton from './LogoutButton'

const Settings = ({ userId }) => {
    const isDark = useContext(AppSettings).darked.isDark
    const [isOver, setIsOver] = useState(false)

    return (
        <>
            <div className={'p-settings' + (isDark ? ' is-dark' : '')}>
                <ThemeSetting setIsOver={setIsOver} />
                <FontSetting setIsOver={setIsOver} />
                <DarkSetting />
                <LogoutButton />
                <DeleteAccount userId={userId} setIsOver={setIsOver} />
            </div>
            {isOver && <span className='c-overlay' />}
        </>
    )
}

export default Settings
