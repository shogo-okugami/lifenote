import React from 'react'
import useDialryForm from './useDialryForm';
import { asset, getDark, getTheme, getClassName, route } from '../../../functions';
import TextArea from '../TextArea/TextArea'

const DialryForm = ({ note = null, date, errors, flag }) => {

    const { userId, isDark, theme, mediaScreenL, csrf, editFlag, dateOfNote } = useDialryForm(note, date)

    return (
        <form className={"c-form--dialry" + getDark(isDark) + getClassName(flag, 'is-arranged')} method="post" action={editFlag ? route('notes.update', [note.id]) : route('notes.store')}>
            {!mediaScreenL && <div className={'c-form__heading' + getDark(isDark) + getTheme({ isDark, theme })} >{dateOfNote}</div>}
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
    )
}

export default DialryForm
