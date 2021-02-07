import React, { useMemo } from 'react';

const Day = ({ userId, year, month, day, dayOfweek, disabled, isDark, mediaScreenL, today, notesDates, setInputDateValue, setNote, setContent }) => {

    const redirect = async (paramId, ...array) => {

        const paramDate = (() => {

            const newArray = array.map(num => {
                return num < 10 ? '0' + String(num) : String(num)
            })

            return newArray.join('-')

        })()

        try {
            const res = await fetch(`api/users/${paramId}/note/${paramDate}`)
            const resp = await res.json()
            if (resp.data.length) {
                window.location.href = 'http://localhost:8888/lifenote/public/home'
            } else {
                window.location.href = `http://localhost:8888/lifenote/public/notes/create/${paramDate}`
            }
        } catch (error) {
            console.log(error)
        }

    }

    const switchContent = async (paramId, ...array) => {

        const paramDate = (() => {

            const newArray = array.map(num => {
                return num < 10 ? '0' + String(num) : String(num)
            })

            return newArray.join('-')

        })()

        try {
            const res = await fetch(`api/users/${paramId}/note/${paramDate}`)
            const resp = await res.json()
            if (resp.data.length) {
                setInputDateValue(today)
                setNote(resp.data[0])
                setContent(true)
            } else {
                setInputDateValue(paramDate)
                setContent(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const findDate = (...array) => {

        const noteDate = (() => {
            const newArray = array.map(num => {
                return num < 10 ? '0' + String(num) : String(num)
            })

            return newArray.join('-')
        })()
        return notesDates.includes(noteDate)

    }

    const getDate = (...array) => {

        const noteDate = (() => {
            const newArray = array.map(num => {
                return num < 10 ? '0' + String(num) : String(num)
            })

            return newArray.join('-')
        })()

        return noteDate

    }

    const flag = findDate(year, month, day)

    const date = getDate(year, month, day)

    return (
        <>
            <td
                onClick={() => mediaScreenL ? switchContent(userId, year, month, day) : redirect(userId, year, month, day)}
                className={'p-calendar__date' + (disabled ? ' is-disabled' : '') + (disabled === false && dayOfweek === 0 ? ' is-sun' : '') + (disabled === false && dayOfweek === 6 ? ' is-sat' : '') + (isDark ? ' is-dark' : '')}
            >
                <div className={(date === today ? ' is-today' : '')}>{day}</div>
                {flag && <span className={'p-calendar__date__circle' + (isDark ? ' is-dark' : '')}></span>}
            </td>
        </>
    )

}

export default Day
