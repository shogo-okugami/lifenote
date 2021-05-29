import React, { useState, useEffect, useRef, useContext } from 'react'
import { asset } from '../../functions'
import { AppSettings } from '../App'

const ThemeSetting = ({ setIsOver }) => {

    const isDark = useContext(AppSettings).darked.isDark
    const { theme, setTheme, getTheme } = useContext(AppSettings).theme

    const themes = ['light', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'indigo', 'pink', 'teal', 'brown', 'cyan']

    const [isShow, setIsShow] = useState(false)

    const modalRef = useRef(null)

    const handleClick = (theme) => {
        localStorage.setItem('theme', theme)
        setTheme(theme)
        setIsShow(false)
        setIsOver(false)
    }

    useEffect(() => {
        isShow && modalRef.current.focus()
    }, [isShow])

    return (
        <div className={'p-settings__group--color'}>
            <h2 className={isDark ? ' is-dark' : ''}>Theme</h2>
            <div className='p-settings__item'>
                <div className='p-settings__current'><p>current theme : </p> <span className={getTheme(theme)} /></div>
                <button className='p-settings__btn' onClick={() => setIsShow(true)}>change theme</button>
            </div>
            {isShow &&
                <div className='c-modal' ref={modalRef} tabIndex={0} onFocus={() => setIsOver(true)}
                    onBlur={() => {
                        setIsOver(false)
                        setIsShow(false)
                    }}>
                    <span onClick={() => {
                        setIsShow(false)
                        setIsOver(false)
                    }} className='c-modal__close'><img src={asset('/images/close.svg')} /></span>
                    <ul>
                        {
                            themes.map((theme, index) => <li className={'c-modal__option' + (getTheme(theme))} onClick={() => handleClick(theme)} key={index}><span>{theme}</span></li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default ThemeSetting
