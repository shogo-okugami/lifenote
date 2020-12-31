import React from 'react';
import ReactDOM from 'react-dom';

const Note = (props) => {

    const note = props.note

    const getNoteDate = (date) => {
        let str = date.substr(0, 10)
        str = str.split('-')
        date = str.map(value => parseInt(value))
        date = new Date(date[0], date[1] - 1, date[2])
        //date = date.substr(0,16)
        return str
    }

    return (
        <>
        {note.map(note => {
                return (
                    <div key={note.id} className="c-card">
                        <div className="c-card__body">
                            <div className="c-card__date">
                                <div className="c-card__date__inner">
                                    <span>{getNoteDate(note.created_at)}</span>
                                </div>
                            </div>
                            <div className="c-card__text">
                                <p>
                                    {note.text}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Note
