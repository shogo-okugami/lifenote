import React from 'react'
import TextArea from './TextArea'

const DialryForm = ({ userId, csrf, note = null, date, isDark, errors, flag, mediaScreenL }) => {

    const editFlag = note ? true : false;

    const dateOfNote = date.replace(/-/g, '/')

    return (
        <>
            <form className={"c-form " + (isDark ? 'is-dark' : '') + (flag ? ' is-arranged' : '')} method="post" action={'http://localhost:8888/lifenote/public/notes' + (editFlag ? `/${note.id}` : '')}>
                {!mediaScreenL && <div className="c-form__heading" >{dateOfNote}</div>}
                <input type="hidden" name="_token" value={csrf} />
                {editFlag && <input type="hidden" name="_method" value="PUT" />}
                <input type="hidden" name="user_id" value={userId} />
                {mediaScreenL ? <div className="c-form__item">
                                  <input className="c-form__input" type="text" name="date" value={dateOfNote} readOnly />
                                </div>
                              : <input type="hidden" name="date" value={date} />}
                <TextArea errors={errors} text={editFlag ? note.text : null} mediaScreenL={mediaScreenL} />
                {mediaScreenL ? <button type="submit" className="c-btn--primary">submit</button>
                              : <button type="submit" className="c-btn--write">
                                  <img src="http://localhost:8888/lifenote/public/images/pencil.svg" />
                                </button>}
            </form>
        </>
    )
}

export default DialryForm
