import React, { useContext } from 'react';
import { settingContext } from './App'

const ToggleDarkButton = (props) => {

    const useSettingContext = useContext(settingContext)

    const { isDark, setIsDark } = useSettingContext.darkMode

    const handleClick = () => {

        localStorage.setItem('darked',isDark ? '' : 'on')

        setIsDark(!isDark)

    }

    return (
        <>
            <div className={'c-btn--toggleDark' + (isDark ? ' is-dark' : '')}onClick={() => handleClick()}><span><img src='images/moon.svg' /></span></div>
        </>
    )

}

export default ToggleDarkButton
