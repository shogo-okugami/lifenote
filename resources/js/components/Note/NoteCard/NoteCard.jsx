
import React from 'react'
import DateHeading from '../DateHeading/DateHeading'
import { getDark, getClassName, nl2br, redirect } from '../../../functions'
import useNoteCard from './useNoteCard'

const NoteCard = ({ note: data, index, monthlyHeading }) => {

    const { isDark, note, date, dateOfHeading } = useNoteCard(data, monthlyHeading)

    return (
        <>
            {dateOfHeading !== note.date.slice(0, 7) && <DateHeading text={note.date.slice(0, 7)} />}
            <div id={"card-" + index} key={note.id} date={note.date.slice(0, 7)} className={'c-card ' + getDark(isDark)} onClick={() => redirect('notes.show', [note.id])}>
                <div className="c-card__body">
                    <div className={'c-card__date' + getDark(isDark)}>
                        <div className={'c-card__date__inner' + getClassName(date.ofWeek === 'Sat', 'is-sat') + getClassName(date.ofWeek === 'Sun', 'is-sun')}>{date.ofWeek}
                            <span className={getClassName(date.ofWeek === 5, 'is-sat') + getClassName(date.ofWeek === 6, 'is-sun')}>{date.day}</span>
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
