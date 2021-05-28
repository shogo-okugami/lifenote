import React, { useContext } from 'react';
import { AppSettings } from '../App'
import { asset } from '../../functions';

const ToggleDarkButton = () => {

    const {autoDarked, setAutoDarked} = useContext(AppSettings).autoDarked
    const {isDark, setIsDark} = useContext(AppSettings).darked

    const handleClick = () => {
        localStorage.setItem('darked', isDark ? '' : 'on')
        if (autoDarked) {
            localStorage.setItem('auto_darked', '')
            setAutoDarked(false)
        }
        setIsDark(!isDark)
    }

    return (
        <>
            <h2 className={isDark ? ' is-dark' : ''}>Dark mode</h2>
            <div className='p-settings__item'>
                <p>dark mode</p>
                <div className={'c-btn--toggleDark' + (isDark ? ' is-dark' : '')} onClick={() => handleClick()}><span><img src={asset('/images/moon.svg')} /></span></div>
            </div>
        </>
    )

}

export default ToggleDarkButton
