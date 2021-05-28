import React, { useState, useEffect, useRef } from 'react'
import months from '../../months'

const MonthMenu = ({ userId, year, month, setDate, setNotes , isDark }) => {

    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        isOpen && menuRef.current.focus()
    }, [isOpen])

    const switchMonth = (year, month) => {

        (async () => {
            try {
                const res = await fetch(`api/users/${userId}/notes/${String(year) + '-' + (month + 1 < 10 ? '0' + String(month + 1) : String(month + 1))}`)
                const resp = await res.json()
                setDate(new Date(year, month))
                setNotes(resp.data)
            } catch (error) {
                console.log(error)
            }

        })()

    }

    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)}
                 onBlur={() => setIsOpen(false)} ref={menuRef}
                 tabIndex={0}
                 className={'p-calendar__month' + (isDark ? ' is-dark' : '')}>
                 {months[month - 1]}
                <ul className={'p-calendar__month__menu' + (isDark ? ' is-dark' : '')}
                    style={isOpen ? { display: 'block' } : { display: 'none' }}>
                    {months.map((month, index) => <li onClick={() => switchMonth(year,index)} className={(isDark ? ' is-dark' : '')} key={index}>{month}</li>)}
                </ul>
            </div>
        </>
    )
}

export default MonthMenu
