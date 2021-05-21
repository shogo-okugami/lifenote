import React, { useState, useEffect, useRef } from 'react'

const ThemeSetting = ({ isDark, setTheme, getTheme, setIsOver }) => {

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
                <p>current theme</p>
                <button className='p-settings__btn' onClick={() => setIsShow(true)}>select theme</button>
            </div>
            {isShow &&
                <div className='c-modal' ref={modalRef} tabIndex={0} onFocus={() => setIsOver(true)}
                    onBlur={() => {
                        setIsOver(false)
                        setIsShow(false)
                    }}>
                    <ul>
                        {
                            themes.map((theme, index) => <li className={'c-modal__option' + (getTheme(theme))} onClick={() => handleClick(theme)} key={index}>{theme}</li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default ThemeSetting
