import React from 'react';
import ReactDOM from 'react-dom';

const Calendar = () => {

  const weeks = ['Sun', 'Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat']
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const startDate = new Date(year, month - 1, 1) //月の最初の年月日を取得
  const endDate = new Date(year, month, 0) //月の最後の年月日を取得 
  const endDayCount = endDate.getDate() //月の末日を取得
  const lastMonthEndDate = new Date(year, month - 1, 0)
  const lastMonthEndDayCount = lastMonthEndDate.getDate()
  const startDay = startDate.getDay()
  let dayCount = 1

  const calendarBody = () => {

    return (
      <tbody className="p-calendar__body">
        {(() => {
          (() => {
            for (let i = 0; i < weeks.length; i++) {
              <td>{weeks[i]}</td>
            }

            (() => {
              for (let w = 0; w < 6; w++) {
                <tr>
                  {(() => {
                    for (let d = 0; d < 7; d++) {
                      if (w == 0 && d < startDay) {
                        // 1行目で1日の曜日の前
                        let num = lastMonthEndDayCount - startDay + d + 1;
                        < td className="is-disabled" >{num}</td>
                      } else if (dayCount > endDayCount) {
                        // 末尾の日数を超えた
                        let num = dayCount - endDayCount;
                        < td className="is-disabled" >{num}</td>
                        dayCount++;
                      } else {
                        <td>{dayCount}</td>
                        dayCount++;
                      }
                    }
                  })()}
                </tr>;
              }
            })()
          })()
        })()}
      </tbody>
    )
  }

  return (
    <div className="p-calendar">
      <div className="p-calendar__heading">{month}{year}</div>
      <table>
        {calendarBody()}
      </table>
    </div>
  );
}

if (document.getElementById('calendar')) {
  ReactDOM.render(<Calendar />, document.getElementById('calendar'));
}