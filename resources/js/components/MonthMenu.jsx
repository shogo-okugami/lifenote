import React, { useState, useEffect, useRef } from 'react'
import months from '../months'

const MonthMenu = ({ year, month, setDate, isDark }) => {

    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        isOpen && menuRef.current.focus()
    }, [isOpen])

    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setIsOpen(false)} ref={menuRef}
                tabIndex={0}
                className={'p-calendar__month' + (isDark ? ' is-dark' : '')}>
                {months[month - 1]}
                <ul className={'p-calendar__month__menu js-target' + (isDark ? ' is-dark' : '')}
                    style={isOpen ? { display: 'block' } : { display: 'none' }}>
                    {months.map((month, index) => <li onClick={() => setDate(new Date(year, index))} className={(isDark ? ' is-dark' : '')} key={index}>{month}</li>)}
                </ul>
            </div>
        </>
    )
}

export default MonthMenu
