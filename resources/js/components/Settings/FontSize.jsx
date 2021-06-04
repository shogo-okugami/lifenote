import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppSettings } from '../App'

const FontSize = () => {
    const [isShow, setIsShow] = useState(false)
    const sizes = ['standard', 'medium', 'large']
    const menuRef = useRef(null)
    const isDark = useContext(AppSettings).darked.isDark

    const handleClick = (value) => {
        localStorage.setItem('font_size', value)
        setIsShow(false)
    }

    const size = (() => {
        const currentSize = localStorage.getItem('font_size')
        if (currentSize) {
            return sizes.find(element => element === currentSize)
        } else {
            'standard'
        }
    })()

    useEffect(() => {
        isShow && menuRef.current.focus()
    }, [isShow])

    return (
        <div className='p-settings__item'>
            <p className='p-settings__current'>current size : {size} </p>
            <button className='p-settings__btn' onClick={() => setIsShow(true)}>
                change size
            </button>
            {isShow &&
                <ul className={'p-settings__menu' + (isDark ? ' is-dark' : '')} ref={menuRef} tabIndex={0} onBlur={() => setIsShow(false)}>
                    {sizes.map((value, index) => <li onClick={() => handleClick(value)} key={index}>{value}</li>)}
                </ul>
            }
        </div>
    )

}

export default FontSize
