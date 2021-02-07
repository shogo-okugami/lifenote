import React from 'react'
import { nl2br } from '../functions'

const Note = ({ flag, note, csrf ,isDark }) => {

    return (
        <>
            <div className={'p-note' + (flag ? '--arranged' : '') + (isDark ? ' is-dark' : '')}>
                <div className={'p-note__menu'}>
                    <span className={'p-note__menu__icon'}>
                        <img src={`http://localhost:8888/lifenote/public/images/edit${ isDark ? '--darked' : ''}.svg`} />
                        <a href={`http://localhost:8888/lifenote/public/notes/${note.id}/edit`} />
                    </span>
                    <span className={'p-note__menu__icon'} >
                        <img src={`http://localhost:8888/lifenote/public/images/delete${ isDark ? '--darked' : ''}.svg`} />
                        <form method="post" action={`http://localhost:8888/lifenote/public/notes/${note.id}`}>
                          <input type='hidden' name='_token' value={csrf} />
                          <input type='hidden' name='_method' value='DELETE' />
                          <button type='submit' />
                        </form>
                    </span>
                </div>
                <div className='p-note__text'>
                    {nl2br(note.text)}
                </div>
            </div>
        </>
    )

}

export default Note
