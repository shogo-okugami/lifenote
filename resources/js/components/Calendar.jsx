import React, { useEffect, useState, useRef, useContext, useMemo } from 'react';
import weeks from '../weeks'
import months from '../months'
import DialryForm from './DialryForm'
import Note from './Note'

const Calendar = ({ userId, notes: index, errors, csrf, date: defaultDate, isDark }) => {

    const [date, setDate] = useState(new Date())
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const today = (() => {

        let dt = new Date();
        let y = dt.getFullYear();
        let m = ("00" + (dt.getMonth() + 1)).slice(-2);
        let d = ("00" + dt.getDate()).slice(-2);
        let result = y + '-' + m + '-' + d;
        return result;

    })()

    const pageFlag = document.documentElement.clientWidth > 800 ? true : false

    const [notes, setNotes] = useState(index)
    const notesDates = notes.map(note => note.created_at.substr(0, 10))
    const [note, setNote] = useState(notes.find(note => note.created_at.substr(0, 10) === today))
    const [content, setContent] = useState((() => notesDates.includes(today)))
    const [inputDateValue, setInputDateValue] = useState(defaultDate)

    useEffect(() => {
        isOpen && menuRef.current.focus()
    }, [isOpen])

    const startDate = new Date(year, month - 1, 1) //月の最初の年月日を取得

    const endDate = new Date(year, month, 0) //月の最後の年月日を取得
    const endDayCount = endDate.getDate() //月の末日を取得
    const lastMonthEndDate = new Date(year, month - 1, 0)
    const lastMonthEndDayCount = lastMonthEndDate.getDate()
    const startDay = startDate.getDay()

    let dayCount = 1

    useEffect(() => {

        (async () => {

            try {

                const res = await fetch(`api/users/${userId}/notes/${String(year) + '-' + (month < 10 ? '0' + String(month) : String(month))}`)
                const resp = await res.json()

                setNotes(resp.data)
            } catch (error) {
                console.log(error)
            }

        })()

    }, [date])

    const changeNextMonth = () => {
        setDate(new Date((month === 12 ? year + 1 : year), (month === 12 ? month - 12 : month)))
    }

    const changePrevMonth = () => {
        setDate(new Date((month === 1 ? year - 1 : year), (month === 1 ? month + 10 : month - 2)))
    }

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
                console.log(defaultDate)
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

    console.log('render')

    const calendarBody = useMemo(
        () => {

            return (
                <>
                    <tr>
                        {
                            weeks.map((day, index) => <td className="p-calendar__date" key={index}>{day}</td>)
                        }
                    </tr>
                    {(() => {
                        const rows = []
                        for (let w = 0; w < 6; w++) {
                            rows.push(<tr key={w} className={'p-calendar__row' + (isDark ? ' is-dark' : '')}>
                                {
                                    (() => {

                                        const dates = [];

                                        for (let d = 0; d < 7; d++) {

                                            if (w === 0 && d < startDay) {

                                                let num = lastMonthEndDayCount - startDay + d + 1
                                                dates.push(<td key={d}
                                                    onClick={() => pageFlag ? switchContent(userId, (month === 1 ? year - 1 : year), (month === 1 ? 12 : month - 1), num) : redirect(userId, (month === 1 ? year - 1 : year), (month === 1 ? 12 : month - 1), num)}
                                                    className={'p-calendar__date--disabled' + (isDark ? ' is-dark' : '')}>{num}</td>)

                                            } else if (dayCount > endDayCount) {

                                                let num = dayCount - endDayCount

                                                dates.push(<td key={d}
                                                    onClick={() => pageFlag ? switchContent(userId, (month === 12 ? year + 1 : year), (month === 12 ? 1 : month + 1), num) : redirect(userId, (month === 12 ? year + 1 : year), (month === 12 ? 1 : month + 1), num)}
                                                    className={'p-calendar__date--disabled' + (isDark ? ' is-dark' : '')}>{num}</td>)
                                                dayCount++

                                            } else {
                                                const day = dayCount

                                                const flag = findDate(year, month, day)

                                                const date = getDate(year, month, day)

                                                dates.push(<td key={d}
                                                    onClick={() => pageFlag ? switchContent(userId, year, month, day) : redirect(userId, year, month, day)}
                                                    className={'p-calendar__date' + (flag ? ' is-posted' : '')}
                                                >
                                                    <div className={(isDark ? 'is-dark' : '') + (date === today ? ' is-today' : '')}>{dayCount}</div>
                                                    {flag && <span className={'js-target' + (isDark ? ' is-dark' : '')}></span>}
                                                </td>)
                                                dayCount++
                                            }
                                        }
                                        return dates
                                    })()
                                }
                            </tr>)
                        }
                        return rows
                    })()}
                </>
            )
        }, [date,notes])

    return (
        <div className={'p-calendar u-flex' + (isDark ? ' is-dark' : '')}>
            <div className='p-calendar__body'>
                <div className="p-calendar__heading">
                    <div className="p-calendar__switch--prev"><img className='icon' onClick={() => changePrevMonth()} src="images/nav-left.svg" /></div>
                    <div onClick={() => setIsOpen(!isOpen)}
                        onBlur={() => setIsOpen(false)} ref={menuRef}
                        tabIndex={0}
                        className={'p-calendar__month' + (isDark ? ' is-dark' : '')}>
                        {months[month - 1]}
                        <ul className={"p-calendar__month__menu js-target"}
                            style={isOpen ? { display: 'block' } : { display: 'none' }}>
                            {months.map((month, index) => <li onClick={() => setDate(new Date(year, index))} className={(isDark ? ' is-dark' : '')} key={index}>{month}</li>)}
                        </ul>
                    </div>
                    <div className="p-calendar__year">{year}</div>
                    <div className="p-calendar__switch--next"><img className='icon' onClick={() => changeNextMonth()} src="images/nav-right.svg" /></div>
                </div>
                <table>
                    <tbody>
                        {calendarBody}
                    </tbody>
                </table>
            </div>
            {content ? <Note note={note} /> : <DialryForm flag={true} errors={errors} userId={userId} csrf={csrf} isDark={isDark} date={inputDateValue} />}
        </div>
    );
}

export default Calendar

