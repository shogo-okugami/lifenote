import React from 'react'
import { nl2br } from '../functions'
import { getNoteDate } from '../components/NoteCard'

const Note = ({ flag, note, csrf, isDark, mediaScreenL }) => {

    const redirect = ()=>{
        window.location.href = `http://localhost:8888/lifenote/public/notes/${noqte.id}/edit`
    }

    return (
        <>
            <div className={'p-note' + (flag ? '--arranged' : '') + (isDark ? ' is-dark' : '')}>
                <div className={'p-note__heading'}>
                    <p>{note.date}</p>
                    <div className={'p-note__menu'}>
                        {mediaScreenL && <span className={'p-note__menu__icon'}>
                            <img src={`http://localhost:8888/lifenote/public/images/edit${isDark ? '--darked' : ''}.svg`} />
                            <a href={`http://localhost:8888/lifenote/public/notes/${note.id}/edit`} />
                        </span>}
                        <span className={'p-note__menu__icon'} >
                            <img src={`http://localhost:8888/lifenote/public/images/delete${isDark ? '--darked' : ''}.svg`} />
                            <form method="post" action={`http://localhost:8888/lifenote/public/notes/${note.id}`}>
                                <input type='hidden' name='_token' value={csrf} />
                                <input type='hidden' name='_method' value='DELETE' />
                                <button type='submit' />
                            </form>
                        </span>
                    </div>
                </div>
                <div className='p-note__text'>
                    {nl2br(note.text)}
                </div>
                {!mediaScreenL && <button onClick={()=> redirect()} className="c-btn--write">
                    <img src="http://localhost:8888/lifenote/public/images/pencil.svg" />
                </button>}
            </div>
        </>
    )

}

export default Note
