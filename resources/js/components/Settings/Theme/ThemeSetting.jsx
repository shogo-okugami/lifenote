import React from 'react'
import { asset, getDark, getTheme } from '../../../functions'
import useThemeSetting from './useThemeSetting'

const ThemeSetting = ({ setIsOver }) => {

    const { isDark, theme, themes, isShow, setIsShow, modalRef, handleClick } = useThemeSetting(setIsOver)

    return (
        <div className={'p-settings__group--color'}>
            <h2 className={(getDark(isDark))}>Theme</h2>
            <div className='p-settings__item'>
                <div className='p-settings__current'><p>current theme : </p> <span className={getTheme({ theme, isDark, ignored: true })} /></div>
                <button className='p-settings__btn' onClick={() => setIsShow(true)}>change theme</button>
            </div>
            {isShow &&
                <div className={'c-modal' + (getDark(isDark))} ref={modalRef} tabIndex={0} onFocus={() => setIsOver(true)}
                    onBlur={() => {
                        setIsOver(false)
                        setIsShow(false)
                    }}>
                    <span onClick={() => {
                        setIsShow(false)
                        setIsOver(false)
                    }} className='c-modal__close'><img src={asset('/images/close.svg', isDark)} /></span>
                    <ul>
                        {
                            themes.map((theme, index) => <li className={'c-modal__option' + (getDark(isDark)) + (getTheme({ theme, isDark, ignored: true }))} onClick={() => handleClick(theme)} key={index}><span>{theme}</span></li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default ThemeSetting
