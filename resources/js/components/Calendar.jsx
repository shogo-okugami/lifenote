import React, { useEffect, useState, useRef, useContext } from 'react';
import weeks from '../weeks'
import months from '../months'
import DialryForm from './DialryForm'
import { settingContext } from './App'

const Calendar = ({ userId, notes: index, errors, csrf, date: defaultDate }) => {

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
    console.log(pageFlag)
    const useSettingContext = useContext(settingContext)
    const isDark = useSettingContext.darkMode.isDark

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

    const [notes, setNotes] = useState(index)

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

    useEffect(() => {

        const elements = document.getElementsByClassName('js-target')

        for (const element of elements) {
            isDark ? element.classList.add('is-dark') : element.classList.remove('is-dark')
        }

    }, [isDark])


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
            console.log(resp.data)
            if (resp.data.length) {
                window.location.href = 'http://localhost:8888/lifenote/public/home'
            } else {
                window.location.href = `http://localhost:8888/lifenote/public/notes/create/${paramDate}`
            }
        } catch (error) {
            console.log(error)
        }

    }

    const [content, setContent] = useState(pageFlag)

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
            console.log(resp.data)
            if (resp.data.length) {
                setContent(true)
            } else {
                setContent(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const calendarBody = (() => {

        const notesDates = notes.map(data => data.created_at.substr(0, 10))

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
                        rows.push(<tr key={w} className={'p-calendar__row js-target'}>
                            {
                                (() => {

                                    const date = [];

                                    for (let d = 0; d < 7; d++) {

                                        if (w === 0 && d < startDay) {

                                            let num = lastMonthEndDayCount - startDay + d + 1
                                            date.push(<td key={d}
                                                onClick={() => pageFlag ? switchContent(userId, (month === 1 ? year - 1 : year), (month === 1 ? 12 : month - 1), num) : redirect(userId, (month === 1 ? year - 1 : year), (month === 1 ? 12 : month - 1), num)}
                                                className={"p-calendar__date--disabled js-target"}>{num}</td>)

                                        } else if (dayCount > endDayCount) {

                                            let num = dayCount - endDayCount

                                            date.push(<td key={d}
                                                onClick={() => pageFlag ? switchContent(userId, (month === 12 ? year + 1 : year), (month === 12 ? 1 : month + 1), num) : redirect(userId, (month === 12 ? year + 1 : year), (month === 12 ? 1 : month + 1), num)}
                                                className={"p-calendar__date--disabled js-target"}>{num}</td>)
                                            dayCount++

                                        } else {
                                            const day = dayCount
                                            const array = [year, month, day]
                                            let noteDate = (() => {
                                                const newArray = array.map(num => {
                                                    return num < 10 ? '0' + String(num) : String(num)
                                                })

                                                return newArray.join('-')
                                            })()

                                            const flag = notesDates.includes(noteDate)

                                            date.push(<td key={d}
                                                onClick={() => pageFlag ? switchContent(userId, year, month, day) : redirect(userId, year, month, day)}
                                                className={"p-calendar__date" + (flag ? ' is-posted' : '') + (noteDate === today ? ' is-today' : '')}
                                            >{dayCount}
                                            </td>)
                                            dayCount++
                                        }
                                    }
                                    return date
                                })()
                            }
                        </tr>)
                    }
                    return rows
                })()}
            </>
        )
    })()

    return (
        <div className={'p-calendar u-flex js-target'}>
            <div className='p-calendar__body'>
                <div className="p-calendar__heading">
                    <div className="p-calendar__switch--prev"><img onClick={() => changePrevMonth()} src="images/nav-left.svg" /></div>
                    <div onClick={() => setIsOpen(!isOpen)}
                        onBlur={() => setIsOpen(false)} ref={menuRef}
                        tabIndex={0}
                        className={'p-calendar__month js-target'}>
                        {months[month - 1]}
                        <ul className={"p-calendar__month__menu"}
                            style={isOpen ? { display: 'block' } : { display: 'none' }}>
                            {months.map((month, index) => <li onClick={() => setDate(new Date(year, index))} key={index}>{month}</li>)}
                        </ul>
                    </div>
                    <div className="p-calendar__year">{year}</div>
                    <div className="p-calendar__switch--next"><img onClick={() => changeNextMonth()} src="images/nav-right.svg" /></div>
                </div>
                <table>
                    <tbody>
                        {calendarBody}
                    </tbody>
                </table>
            </div>
            {content ? <div>sample</div> : <DialryForm flag={true} errors={errors} userId={userId} csrf={csrf} isDark={isDark} date={defaultDate} />}
        </div>
    );
}

export default Calendar

