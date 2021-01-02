
import React from 'react';
import weeks from '../weeks'

const Note = (props) => {

    const note = props.note

    const getNoteDate = (date) => {
        let str = date.substr(0, 10)
        str = str.split('-')
        date = str.map(value => parseInt(value))
        date = new Date(date[0], date[1] - 1, date[2])
        const result = {}
        result.day = date.getDate()
        result.month = date.getMonth() + 1
        result.year = date.getFullYear()
        result.ofWeek = weeks[date.getDay()]
        return result
    }

    const date = getNoteDate(note.created_at)

    return (
        <>
            <div key={note.id} className="c-card">
                <div className="c-card__body">
                    <div className="c-card__date">
                        <div className="c-card__date__inner">
                            {date.month}/{date.day} {date.ofWeek}<span>{date.year}</span>
                        </div>
                    </div>
                    <div className="c-card__text">
                        <p>
                            {note.text}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Note
