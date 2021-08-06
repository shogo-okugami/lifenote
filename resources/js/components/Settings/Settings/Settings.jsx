import React, { useState, useContext } from 'react'
import { app } from '../../App/useApp'
import ThemeSetting from '../Theme/ThemeSetting'
import FontSetting from '../FontSetting/FontSetting'
import DarkSetting from '../DarkSetting/DarkSettting'
import DeleteAccount from '../DeleteAccount/DeleteAccount'
import LogoutButton from '../LogoutButton/LogoutButton'
import { getDark } from '../../../functions'

const Settings = ({ userId }) => {

    const { isDark } = useContext(app).darked
    const [isOver, setIsOver] = useState(false)

    return (
        <>
            <div className={'p-settings' + getDark(isDark)}>
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
