import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import weeks from '../weeks'
import months from '../months'

const Calendar = () => {

    const [date, setDate] = useState(new Date())
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

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

    const changeNextMonth = () => {
        month === 12 ? setDate(new Date(year + 1, month - 12)) : setDate(new Date(year, month));
    }

    const changePrevMonth = () => {
        month === 1 ? setDate(new Date(year - 1, month + 10)) : setDate(new Date(year, month - 2));
    }

    const calendarBody = () => {

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
                        rows.push(<tr key={w}>
                            {
                                (() => {

                                    const date = [];

                                    for (let d = 0; d < 7; d++) {
                                        if (w === 0 && d < startDay) {
                                            let num = lastMonthEndDayCount - startDay + d + 1
                                            date.push(<td key={d} className="p-calendar__date--disabled">{num}</td>)
                                        } else if (dayCount > endDayCount) {
                                            let num = dayCount - endDayCount
                                            date.push(<td key={d} className="p-calendar__date--disabled">{num}</td>)
                                            dayCount++
                                        } else {
                                            date.push(<td key={d} className="p-calendar__date">{dayCount}</td>)
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
    }

    return (
        <div className="p-calendar">
            <div className="p-calendar__heading">
                <div className="p-calendar__switch--prev"><img onClick={() => changePrevMonth()} src="images/nav-left.svg" /></div>
                <div onClick={() => setIsOpen(!isOpen)} onBlur={() => setIsOpen(false)} ref={menuRef} tabIndex={0} className="p-calendar__month">{months[month - 1]}
                    <ul className={"p-calendar__month__menu"} style={isOpen ? { display: 'block' } : { display: 'none' }}>{months.map((month, index) => <li onClick={() => setDate(new Date(year, index))} key={index}>{month}</li>)}</ul>
                </div>
                <div className="p-calendar__year">{year}</div>
                <div className="p-calendar__switch--next"><img onClick={() => changeNextMonth()} src="images/nav-right.svg" /></div>
            </div>
            <table className="p-calendar__body">
                <tbody>
                    {calendarBody()}
                </tbody>
            </table>
        </div>
    );
}

export default Calendar

