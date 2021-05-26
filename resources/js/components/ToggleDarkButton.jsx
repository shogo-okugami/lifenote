import React from 'react';
import { asset } from '../functions';

const ToggleDarkButton = ({ isDark, setIsDark, autoDarked, setAutoDarked }) => {

    const handleClick = () => {
        localStorage.setItem('darked', isDark ? '' : 'on')
        if (autoDarked) {
            localStorage.setItem('auto_darked','')
            setAutoDarked(false)
        }
        setIsDark(!isDark)

    }

    return (
        <>
            <div className={'c-btn--toggleDark' + (isDark ? ' is-dark' : '')} onClick={() => handleClick()}><span><img src={asset('/images/moon.svg')} /></span></div>
        </>
    )

}

export default ToggleDarkButton
