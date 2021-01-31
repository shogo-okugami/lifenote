import React, { useState } from 'react'

const YearSwitch = ({ userId, year, month, setDate, setNotes, isDark }) => {

    const [isShow, setIsShow] = useState(false)

    const changeNextYear = (year, month) => {

        (async () => {

            try {

                const res = await fetch(`api/users/${userId}/notes/${String(year) + '-' + (month < 10 ? '0' + String(month) : String(month))}`)
                const resp = await res.json()
                setDate(new Date(year, month))
                setNotes(resp.data)
            } catch (error) {
                console.log(error)
            }

        })()
    }

    const changePrevYear = (year, month) => {

        (async () => {

            try {

                const res = await fetch(`api/users/${userId}/notes/${String(year) + '-' + (month < 10 ? '0' + String(month) : String(month))}`)
                const resp = await res.json()
                setDate(new Date(year, month))
                setNotes(resp.data)
            } catch (error) {
                console.log(error)
            }

        })()
    }

    return (
        <div onMouseOver={() => setIsShow(true)} onMouseOut={() => setIsShow(false)} className={'p-calendar__year' + (isDark ? ' is-dark' : '')}>
            <p>{year}</p>
            <div className={'p-calendar__year__box' + (isShow ? '--showed' : '') + (isDark ? ' is-dark' : '')}>
                <span onClick={() => changeNextYear(year + 1, month - 1)} className={'p-calendar__year__switch--up'}>
                    <img src={`images/nav-up${isDark ? '--darked' : ''}.svg`} />
                </span>
                <span onClick={() => changePrevYear(year - 1, month - 1)} className={'p-calendar__year__switch--down'}>
                    <img src={`images/nav-down${isDark ? '--darked' : ''}.svg`} />
                </span>
            </div>
        </div>
    )

}

export default YearSwitch
