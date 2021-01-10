import React, { useRef } from 'react'
import TextArea from './TextArea'

const DialryForm = ({userId,csrf,date,isDark,errors}) => {

    return (
        <>
            <form className={"c-form " + (isDark ? 'is-dark' : '')} method="post" action="http://localhost:8888/lifenote/public/notes">
                <input type="hidden" name="_token" value={csrf} />
                <input type="hidden" name="user_id" value={userId} />
                <div className="c-form__item">
                    <input id="js-input-date" name="created_at" className="c-form__input js-flatpickr" defaultValue={date} />
                </div>
                <TextArea errors={errors} />
                <button type="submit" className="c-btn--primary">submit</button>
            </form>
        </>
    )
}

export default DialryForm
