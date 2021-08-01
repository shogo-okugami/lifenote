import React from 'react'
import useDateHeading from './useDateHeading'
import { getDark, getTheme } from '../../../functions'

const DateHeading = ({ text }) => {

    const { isDark, theme, date } = useDateHeading(text)

    return (<div className={'c-heading--date' + getDark(isDark, 'is-dark') + getTheme({ theme, isDark })}>{date}</div>)
}

export default DateHeading
