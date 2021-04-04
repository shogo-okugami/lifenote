import React from 'react'
import TextArea from './TextArea'

const DialryForm = ({ userId, csrf, note = null, date, isDark, errors, flag }) => {

    const editFlag = note ? true : false;

    return (
        <>
            <form className={"c-form " + (isDark ? 'is-dark' : '') + (flag ? ' is-arranged' : '')} method="post" action={`http://localhost:8888/lifenote/public/notes${editFlag ? `/${userId}` : ''}`}>
                <input type="hidden" name="_token" value={csrf} />
                {editFlag && <input type="hidden" name="_method" value="PUT" />}
                <input type="hidden" name="user_id" value={userId} />
                <input type="hidden" name="created_at" value={date} />
                <TextArea errors={errors} text={editFlag ? note.text : null} />
                <button type="submit" className="c-btn--primary">submit</button>
            </form>
        </>
    )
}

export default DialryForm
