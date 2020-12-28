import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Note = (props) => {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])



    const getNotes = async () => {

        try {
            const res = await fetch(`api/home?user_id=${props.userId}`)
            const notes = await res.json()
            console.log(notes)
            setNotes(notes)
        } catch (error) {
            console.log(error)
        }

    }

    const getNoteDate = (date) =>{
      let str = date.substr(0,10)
      str = str.split('-')
      date = str.map ( value => parseInt(value))
      date = new Date(date[0],date[1]-1,date[2])
      //date = date.substr(0,16)
      console.log(date)
      return str
    }

    return (
        <>{notes.map(note => {
            return (
                <div key={note.id} className="c-card">
                    <div className="c-card__body">
                        <div className="c-card__date">
                            <div className="c-card__date__inner">
                                <span>{ getNoteDate(note.created_at)}</span>
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

const Element = document.getElementById('note');
if (Element) {
    const userId = Element.getAttribute('userId');
    const parsedUserId = JSON.parse(userId);
    ReactDOM.render(<Note userId={parsedUserId} />, Element);
}
