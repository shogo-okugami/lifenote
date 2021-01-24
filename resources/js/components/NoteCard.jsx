
import React, { useContext } from 'react';
import weeks from '../weeks'
import { nl2br } from '../functions'
import { settingContext } from './App'

const NoteCard = ({ userId, note: noteItem }) => {

    const note = noteItem

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

    const useSettingContext = useContext(settingContext)

    const isDark = useSettingContext.darkMode.isDark


    const redirect = (noteId) => {

        window.location.href = `http://localhost:8888/lifenote/public/notes/${noteId}`

    }

    return (
        <>
            <div key={note.id} className={'c-card ' + (isDark ? 'is-dark' : '')} onClick={() => redirect(note.id)}>
                <div className="c-card__body">
                    <div className={'c-card__date ' + (isDark ? 'is-dark' : '')}>
                        <div className="c-card__date__inner">
                            {date.month}/{date.day} {date.ofWeek}<span className={isDark ? 'is-dark' : ''}>{date.year}</span>
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
