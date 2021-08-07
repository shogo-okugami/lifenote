import React from 'react'
import { getDark } from '../../../functions'
import useFontSize from './useFontSize'

const FontSize = () => {

    const { isShow, setIsShow, sizes, size, menuRef, isDark, handleClick } = useFontSize()

    return (
        <div className='p-settings__item'>
            <p className='p-settings__current'>current size : {size} </p>
            <button className='p-settings__btn' onClick={() => setIsShow(true)}>
                change size
            </button>
            {isShow &&
                <ul className={'p-settings__menu' + (getDark(isDark))} ref={menuRef} tabIndex={0} onBlur={() => setIsShow(false)}>
                    {sizes.map((value, index) => <li onClick={() => handleClick(value)} key={index}>{value}</li>)}
                </ul>
            }
        </div>
    )
}

export default FontSize
