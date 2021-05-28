import React, { useEffect, useRef, useState } from 'react'

const FontSize = () => {
    const [isShow, setIsShow] = useState(false)
    const sizes = ['standard', 'medium', 'large']
    const menuRef = useRef(null)

    const handleClick = (value) => {
        localStorage.setItem('font_size', value)
        setIsShow(false)
    }

    useEffect(() => {
        isShow && menuRef.current.focus()
    }, [isShow])

    return (
        <div className='p-settings__item'>
            <p>current size </p>
            <button className='p-settings__btn' onClick={() => setIsShow(true)}>
                <p>change size</p>
            </button>
            {isShow &&
                <ul className='p-settings__menu' ref={menuRef} tabIndex={0} onBlur={() => setIsShow(false)}>
                    {sizes.map((value, index) => <li onClick={() => handleClick(value)} key={index}>{value}</li>)}
                </ul>
            }
        </div>
    )

}

export default FontSize
