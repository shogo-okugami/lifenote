import React from 'react'
import { nl2br, route, asset, redirect, getDark, getTheme, getClassName } from '../../../functions'
import useNote from './useNote'

const Note = ({ flag, note }) => {

    const { isDark, theme, mediaScreenL, csrf, size } = useNote()

    return (
        <>
            <div className={'p-note' + (flag ? '--arranged' : '') + getDark(isDark)}>
                <div className={'p-note__heading' + getDark(isDark) + getClassName(!mediaScreenL, getTheme({ theme, isDark }))}>
                    <p>{note.date}</p>
                    <div className={'p-note__menu'}>
                        {mediaScreenL && <span className={'p-note__menu__icon'}>
                            <img src={asset('/images/edit.svg', isDark)} />
                            <a href={route('notes.edit', [note.id])} />
                        </span>}
                        <span className={'p-note__menu__icon'} >
                            <img src={asset('/images/delete.svg', isDark || theme)} />
                            <form method="post" action={route('notes.destroy', [note.id])}>
                                <input type='hidden' name='_token' value={csrf} />
                                <input type='hidden' name='_method' value='DELETE' />
                                <button type='submit' />
                            </form>
                        </span>
                    </div>
                </div>
                <div className={'p-note__text' + getClassName(size, `is-${size}`)}>
                    {nl2br(note.text)}
                </div>
                {!mediaScreenL && <button onClick={() => redirect('notes.edit', [note.id])} className="c-btn--write">
                    <img src={asset('/images/pencil.svg')} />
                </button>}
            </div>
        </>
    )

}

export default Note
