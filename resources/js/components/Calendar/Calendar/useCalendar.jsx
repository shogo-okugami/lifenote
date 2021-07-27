import React, { useState, useMemo, useContext } from 'react';
import weeks from '../../../weeks'
import Day from '../Day/Day'
import { app } from '../../App/useApp';

const useCalendar = (index, defaultDate) => {

    const { user: { userId }, darked: { isDark }, csrf, mediaScreenL } = useContext(app)

    const [calendar, setCalendar] = useState({ date: new Date(), notes: index })

    const year = calendar.date.getFullYear()
    const month = calendar.date.getMonth() + 1

    const handleClick = (action) => {
        (async () => {
            const param = {}
            const date = {}
            switch (action) {
                case 'next':
                    param.year = month === 12 ? year + 1 : year
                    param.month = month === 12 ? month - 11 : month + 1
                    date.year = month === 12 ? year + 1 : year
                    date.month = month === 12 ? month - 12 : month
                    break
                case 'prev':
                    param.year = month === 1 ? year - 1 : year
                    param.month = month === 1 ? month + 11 : month - 1
                    date.year = month === 1 ? year - 1 : year
                    date.month = month === 1 ? month + 10 : month - 2
                    break
            }
            try {
                const res = await fetch(`api/users/${userId}/notes/${String(param.year) + '-' + (param.month < 10 ? '0' + String(param.month) : String(param.month))}`)
                const resp = await res.json()
                setCalendar({ date: new Date(date.year, date.month), notes: resp })
            } catch (error) {
                console.log(error)
            }
        })()
    }

    const today = (() => {
        let dt = new Date();
        let y = dt.getFullYear();
        let m = ("00" + (dt.getMonth() + 1)).slice(-2);
        let d = ("00" + dt.getDate()).slice(-2);
        let result = y + '/' + m + '/' + d;
        return result;
    })()

    const notesDates = calendar.notes.map(note => note.date.substr(0, 10))
    const [note, setNote] = useState({
        note: calendar.notes.find(note => note.date.substr(0, 10) === today),
        exists: notesDates.includes(today)
    })
    const [inputDateValue, setInputDateValue] = useState(defaultDate)

    const startDate = new Date(year, month - 1, 1) //月の最初の年月日を取得

    const prevCount = startDate.getDay()

    const endDate = new Date(year, month, 0) //月の最後の年月日を取得
    const endDayCount = endDate.getDate() //月の末日を取得
    const lastMonthEndDate = new Date(year, month - 1, 0)
    const lastMonthEndDayCount = lastMonthEndDate.getDate()
    const startDay = startDate.getDay()
    const nextCount = 6 - endDate.getDay()
    const count = prevCount + nextCount + endDayCount
    const length = Math.round(count / 7)

    let dayCount = 1

    const body = useMemo(
        () => {
            return (
                <>
                    <tr className="p-calendar__row">
                        {
                            weeks.map((day, index) => <td className={'p-calendar__date' + (index === 6 ? ' is-sat' : '') + (index === 0 ? ' is-sun' : '')} key={index}>{day}</td>)
                        }
                    </tr>
                    {(() => {
                        const rows = []
                        for (let w = 0; w < length; w++) {
                            rows.push(<tr key={w} className={'p-calendar__row' + (isDark ? ' is-dark' : '')}>
                                {
                                    (() => {

                                        const dates = [];

                                        for (let d = 0; d < 7; d++) {

                                            const date = { year, month, dayOfweek: d, today, day: null }

                                            if (w === 0 && d < startDay) {

                                                const day = lastMonthEndDayCount - startDay + d + 1

                                                date.day = day
                                                date.year = month === 1 ? year - 1 : year
                                                date.month = month === 1 ? 12 : month - 1

                                                dates.push(<Day userId={userId} date={date} disabled={true} notesDates={notesDates} key={d} setInputDateValue={setInputDateValue} setNote={setNote} />)

                                            } else if (dayCount > endDayCount) {

                                                const day = dayCount - endDayCount

                                                date.day = day
                                                date.year = month === 12 ? year + 1 : year
                                                date.month = month === 12 ? 1 : month + 1

                                                dates.push(<Day userId={userId} date={date} disabled={true} notesDates={notesDates} key={d} setInputDateValue={setInputDateValue} setNote={setNote} />)
                                                dayCount++

                                            } else {
                                                const day = dayCount

                                                date.day = day

                                                dates.push(<Day userId={userId} date={date} disabled={false} notesDates={notesDates} key={d} setInputDateValue={setInputDateValue} setNote={setNote} />)
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
        }, [calendar, isDark, mediaScreenL])

    return { year, month, userId, isDark, csrf, mediaScreenL, body, setCalendar, handleClick, note, inputDateValue }
}

export default useCalendar
