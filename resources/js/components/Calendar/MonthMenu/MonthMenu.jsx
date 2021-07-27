import React from 'react'
import { getDark, getClassName } from '../../../functions'
import months from '../../../months'
import useMonthMenu from './useMonthMenu'

const MonthMenu = ({ year, month, setCalendar }) => {

    const { isDark, isOpen, setIsOpen, menuRef, handleClick } = useMonthMenu(setCalendar)

    return (
        <div onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(false)} ref={menuRef}
            tabIndex={0}
            className={'p-calendar__month' + getDark(isDark)}>
            {months[month - 1]}
            <ul className={'p-calendar__month__menu' + getClassName(isOpen, 'is-open') + getDark(isDark)}>
                {months.map((month, index) => <li onClick={() => handleClick(year, month = index)} className={getDark(isDark)} key={index}>{month}</li>)}
            </ul>
        </div>
    )
}

export default MonthMenu
