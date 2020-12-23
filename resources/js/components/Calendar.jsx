import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Calendar = () => {

  const isFirstRender = useRef(false)

  const date = new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)
  console.log(year, month)

  const startDate = new Date(year, month - 1, 1) //月の最初の年月日を取得
  console.log(startDate)

  const endDate = new Date(year, month, 0) //月の最後の年月日を取得 
  console.log(endDate)
  console.log(month)
  const endDayCount = endDate.getDate() //月の末日を取得
  const lastMonthEndDate = new Date(year, month - 1, 0)
  const lastMonthEndDayCount = lastMonthEndDate.getDate()
  const startDay = startDate.getDay()

  let dayCount = 1

  const increaseMonth = () => {
    console.log(month)
    month === 12 ? setMonth(1) : setMonth(month + 1);
  }

  const decreaceMonth = () => {
    month === 1 ? setMonth(12) : setMonth(month - 1);
  }

  useEffect(() => {
    isFirstRender.current = true
  }, [])

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender.current = false
    } else {
      console.log(`effect${month}`)
      if (month === 0) {
        setYear(year + 1)
      }
    }
  }, [month])

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
            rows.push(<tr>
              {
                (() => {

                  const date = [];

                  for (let d = 0; d < 7; d++) {
                    if (w === 0 && d < startDay) {
                      let num = lastMonthEndDayCount - startDay + d + 1
                      date.push(<td className="p-calendar__date--disabled">{num}</td>)
                    } else if (dayCount > endDayCount) {
                      let num = dayCount - endDayCount
                      date.push(<td className="p-calendar__date--disabled">{num}</td>)
                      dayCount++
                    } else {
                      date.push(<td className="p-calendar__date">{dayCount}</td>)
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
        <div className="p-calendar__switch"><img onClick={() => decreaceMonth()} src="images/nav-left.svg" /></div>
        <div>{months[month - 1]}</div>
        <div>{year}</div>
        <div className="p-calendar__switch"><img onClick={() => increaseMonth()} src="images/nav-right.svg" /></div>
      </div>
      <table className="p-calendar__body">
        <tbody>
          {calendarBody()}
        </tbody>
      </table>
    </div>
  );
}

if (document.getElementById('calendar')) {
  ReactDOM.render(<Calendar />, document.getElementById('calendar'));
}