import React from 'react';
import { getDark, getClassName } from '../../../functions';
import useDay from './useDay';

const Day = ({ date, disabled, notesDates, setInputDateValue, setNote }) => {

    const { userId, isDark, mediaScreenL, flag, isToday, handleClick, year, month, dayOfweek, day, } = useDay(date, notesDates, setNote, setInputDateValue)

    return (
        <td
            onClick={() => handleClick(userId, mediaScreenL ? 'switch' : 'redirect', year, month, day)}
            className={'p-calendar__date' + getClassName(disabled, 'is-disabled') + getClassName(disabled === false && dayOfweek === 0, 'is-sun') + getClassName(disabled === false && dayOfweek === 6, 'is-sat') + getDark(isDark)}
        >
            <div className={getClassName(isToday, 'is-today')}>{day}</div>
            {flag && <span className={'p-calendar__date__circle' + getDark(isDark)}></span>}
        </td>
    )
}

export default Day
