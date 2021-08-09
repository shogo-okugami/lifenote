import React from 'react'
import { asset, getDark } from '../../../functions';
import useToggleDarkButton from './useToggleDarkButton';

const ToggleDarkButton = () => {

    const { isDark, handleClick } = useToggleDarkButton()

    return (
        <>
            <h2 className={getDark(isDark)}>Dark mode</h2>
            <div className='p-settings__item'>
                <p>dark mode</p>
                <div className={'c-btn--toggleDark' + (getDark(isDark))} onClick={() => handleClick()}><span><img src={asset('/images/moon.svg')} /></span></div>
            </div>
        </>
    )

}

export default ToggleDarkButton
