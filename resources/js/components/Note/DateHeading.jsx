import React from 'react'
import months from '../../months'

const DateHeading = ({ text, isDark }) => {

    //日付を英名＋年に変換
    const date = (() => {
        let date = text.split('/')
        const year = date[0]
        const month = months[Number(date[1] - 1)]
        return month +  ' ' + year
    })()

    return (<div className={'c-heading--date' + (isDark ? ' is-dark' : '')}>{date}</div>)
}
export default DateHeading
