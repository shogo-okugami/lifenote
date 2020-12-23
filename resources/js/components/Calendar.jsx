import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Calendar = () => {

  const date = new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)

  const startDate = new Date(year, month - 1, 1) //月の最初の年月日を取得

  const endDate = new Date(year, month, 0) //月の最後の年月日を取得 
  const endDayCount = endDate.getDate() //月の末日を取得
  const lastMonthEndDate = new Date(year, month - 1, 0)
  const lastMonthEndDayCount = lastMonthEndDate.getDate()
  const startDay = startDate.getDay()

  let dayCount = 1

  const increaseMonth = () => {
    setMonth(month + 1)
  }

  const decreaceMonth = () => {
    setMonth(month - 1)
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