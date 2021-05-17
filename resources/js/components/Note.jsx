import React from 'react'
import { nl2br, route, asset } from '../functions'

const Note = ({ flag, note, csrf, isDark, mediaScreenL }) => {

    const redirect = () => {
        window.location.href = route('notes.edit', [note.id])
    }

    return (
        <>
            <div className={'p-note' + (flag ? '--arranged' : '') + (isDark ? ' is-dark' : '')}>
                <div className={'p-note__heading'}>
                    <p>{note.date}</p>
                    <div className={'p-note__menu'}>
                        {mediaScreenL && <span className={'p-note__menu__icon'}>
                            <img src={asset(`/images/edit${isDark ? '--darked' : ''}.svg`)} />
                            <a href={route('notes.edit', [note.id])} />
                        </span>}
                        <span className={'p-note__menu__icon'} >
                            <img src={asset(`/images/delete${isDark ? '--darked' : ''}.svg`)} />
                            <form method="post" action={route('notes.destroy', [note.id])}>
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
                {!mediaScreenL && <button onClick={() => redirect()} className="c-btn--write">
                    <img src={asset('/images/pencil.svg')} />
                </button>}
            </div>
        </>
    )

}

export default Note
