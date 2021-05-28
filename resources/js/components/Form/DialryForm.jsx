import React from 'react'
import { asset, route } from '../../functions';
import TextArea from './TextArea'

const DialryForm = ({ userId, csrf, note = null, date, isDark, errors, flag, mediaScreenL }) => {

    const editFlag = Boolean(note)

    const dateOfNote = date.replace(/-/g, '/')

    return (
        <>
            <form className={"c-form " + (isDark ? 'is-dark' : '') + (flag ? ' is-arranged' : '')} method="post" action={editFlag ? route('notes.update', [note.id]) : route('notes.store')}>
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
                        <img src={asset('/images/pencil.svg')} />
                    </button>}
            </form>
        </>
    )
}

export default DialryForm
