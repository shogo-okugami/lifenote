import React from 'react'
import { asset, getDark, getClassName } from '../../../functions'
import useYearSwitch from './useYearSwitch'

const YearSwitch = ({ year, month, setCalendar }) => {

    const { isDark, isShow, setIsShow, handleClick } = useYearSwitch(setCalendar)

    return (
        <div onMouseOver={() => setIsShow(true)} onMouseOut={() => setIsShow(false)} className={'p-calendar__year' + getDark(isDark)}>
            <p>{year}</p>
            <div className={'p-calendar__year__box' + getClassName(isShow, 'is-show')}>
                <span onClick={() => handleClick(year + 1, month - 1)} className='p-calendar__year__switch--up'>
                    <img src={asset('/images/nav-up.svg', isDark)} />
                </span>
                <span onClick={() => handleClick(year - 1, month - 1)} className='p-calendar__year__switch--down'>
                    <img src={asset('/images/nav-down.svg', isDark)} />
                </span>
            </div>
        </div>
    )
}

export default YearSwitch
