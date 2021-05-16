import React, { useState, useMemo } from 'react';
import weeks from '../weeks'
import Day from './Day'
import MonthMenu from './MonthMenu'
import YearSwitch from './YearSwitch'
import DialryForm from './DialryForm'
import Note from './Note'

const Calendar = ({ userId, mediaScreenL, notes: index, errors, csrf, date: defaultDate, isDark }) => {

    const [date, setDate] = useState(new Date())
    const year = date.getFullYear()
    const month = date.getMonth() + 1;

    const today = (() => {
        let dt = new Date();
        let y = dt.getFullYear();
        let m = ("00" + (dt.getMonth() + 1)).slice(-2);
        let d = ("00" + dt.getDate()).slice(-2);
        let result = y + '/' + m + '/' + d;
        return result;
    })()

    const [notes, setNotes] = useState(index)
    const notesDates = notes.map(note => note.date.substr(0, 10))
    const [note, setNote] = useState(notes.find(note => note.date.substr(0, 10) === today))
    const [content, setContent] = useState((() => notesDates.includes(today)))
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

    const changeNextMonth = () => {

        (async () => {

            const param = {
                year: (month === 12 ? year + 1 : year),
                month: (month === 12 ? month - 11 : month + 1),
            }

            const date = {
                year: (month === 12 ? year + 1 : year),
                month: (month === 12 ? month - 12 : month),
            }

            try {

                const res = await fetch(`api/users/${userId}/notes/${String(param.year) + '-' + (param.month < 10 ? '0' + String(param.month) : String(param.month))}`)
                const resp = await res.json()
                setDate(new Date(date.year, date.month))
                setNotes(resp.data)
            } catch (error) {
                console.log(error)
            }

        })()
    }

    const changePrevMonth = () => {

        (async () => {

            const param = {
                year: (month === 1 ? year - 1 : year),
                month: (month === 1 ? month + 11 : month - 1),
            }

            const date = {
                year: (month === 1 ? year - 1 : year),
                month: (month === 1 ? month + 10 : month - 2),
            }

            try {

                const res = await fetch(`api/users/${userId}/notes/${String(param.year) + '-' + (param.month < 10 ? '0' + String(param.month) : String(param.month))}`)
                const resp = await res.json()
                setDate(new Date(date.year, date.month))
                setNotes(resp.data)
            } catch (error) {
                console.log(error)
            }

        })()
    }

    const calendarBody = useMemo(
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

                                            if (w === 0 && d < startDay) {

                                                const day = lastMonthEndDayCount - startDay + d + 1

                                                dates.push(<Day userId={userId} year={(month === 1 ? year - 1 : year)} dayOfweek={d} month={(month === 1 ? 12 : month - 1)} day={day} disabled={true} isDark={isDark} mediaScreenL={mediaScreenL} today={today} notesDates={notesDates} key={d} setInputDateValue={setInputDateValue} setNote={setNote} setContent={setContent} />)

                                            } else if (dayCount > endDayCount) {

                                                const day = dayCount - endDayCount

                                                dates.push(<Day userId={userId} year={(month === 12 ? year + 1 : year)} dayOfweek={d} month={(month === 12 ? 1 : month + 1)} day={day} disabled={true} isDark={isDark} mediaScreenL={mediaScreenL} today={today} notesDates={notesDates} key={d} setInputDateValue={setInputDateValue} setNote={setNote} setContent={setContent} />)
                                                dayCount++

                                            } else {
                                                const day = dayCount

                                                dates.push(<Day userId={userId} year={year} dayOfweek={d} month={month} day={day} disabled={false} isDark={isDark} mediaScreenL={mediaScreenL} today={today} notesDates={notesDates} key={d} setInputDateValue={setInputDateValue} setNote={setNote} setContent={setContent} />)
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
        }, [date, notes, isDark, mediaScreenL])

    return (
        <div className={'p-calendar' + (mediaScreenL ? ' u-flex' : '') + (isDark ? ' is-dark' : '')}>
            <div className='p-calendar__body'>
                <div className="p-calendar__heading">
                    <div className="p-calendar__switch--prev"><img onClick={() => changePrevMonth()} src={`images/nav-left${isDark ? '--darked' : ''}.svg`} /></div>
                    <MonthMenu userId={userId} year={year} month={month} setDate={setDate} setNotes={setNotes} isDark={isDark} />
                    {mediaScreenL ? <YearSwitch userId={userId} year={year} month={month} setDate={setDate} setNotes={setNotes} isDark={isDark} /> : <div>{year}</div>}
                    <div className="p-calendar__switch--next"><img onClick={() => changeNextMonth()} src={`images/nav-right${isDark ? '--darked' : ''}.svg`} /></div>
                </div>
                <table>
                    <tbody>
                        {calendarBody}
                    </tbody>
                </table>
            </div>
            { mediaScreenL ? content ? <Note flag={true} note={note} csrf={csrf} isDark={isDark} mediaScreenL={mediaScreenL} /> : <DialryForm flag={true} errors={errors} userId={userId} csrf={csrf} isDark={isDark} date={inputDateValue} mediaScreenL={mediaScreenL} /> : ''}
        </div>
    );
}

export default Calendar

