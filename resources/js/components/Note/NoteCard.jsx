
import React from 'react'
import DateHeading from './DateHeading'
import weeks from '../../weeks'
import { nl2br, route } from '../../functions'

const NoteCard = ({ note: data, isDark, index, monthlyHeading }) => {

    const note = data //ノートを格納

    //ノートの日付(d)と曜日を返す関数
    const getDate = (date) => {
        let str = date.split('/')
        date = str.map(value => parseInt(value))
        date = new Date(date[0], date[1] - 1, date[2])
        const result = {}
        result.day = date.getDate()
        result.ofWeek = weeks[date.getDay()]
        return result
    }

    const date = getDate(note.date)
    const dateOfHeading = monthlyHeading.current //各ノートの月毎の日付を格納
    monthlyHeading.current = note.date.slice(0, 7) //ノートの日付(Y/m)を格納

    //リダイレクト関数
    const redirect = () => {
        window.location.href = route('notes.show', [note.id])
    }

    return (
        <>
            {dateOfHeading !== note.date.slice(0, 7) && <DateHeading text={note.date.slice(0, 7)} isDark={isDark} />}
            <div id={"card-" + index} key={note.id} date={note.date.slice(0, 7)} className={'c-card ' + (isDark ? 'is-dark' : '')} onClick={() => redirect(note.id)}>
                <div className="c-card__body">
                    <div className={'c-card__date ' + (isDark ? 'is-dark' : '')}>
                        <div className={'c-card__date__inner' + (date.ofWeek === 'Sat' ? ' is-sat' : '') + (date.ofWeek === 'Sun' ? ' is-sun' : '')}>{date.ofWeek}
                            <span className={(date.ofWeek === 5 ? 'is-sat' : '') + (date.ofWeek === 6 ? 'is-sun' : '')}>{date.day}</span>
                        </div>
                    </div>
                    <div className="c-card__text">
                        <div>
                            {nl2br(note.text)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteCard
