import React, { useState, useEffect, createContext, useContext, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import NoteList from './NoteList'
import Note from './Note'
import Calendar from './Calendar'
import DialryForm from './DialryForm'
import ToggleDarkButton from './ToggleDarkButton'

const setColorMode = (color) => {

    switch (color) {
        case 'red':
            return 'is-red'
            break;
        default:
            return ''
            break;
    }

}

const App = ({ userId, isLogin, csrf, content, errors, date, notes, note }) => {

    const colors = ['normal', 'red', 'blue', 'yellow', 'green', 'pink']

    const [color, setColor] = useState(colors[Number(localStorage.getItem('color'))])

    const [isDark, setIsDark] = useState(Boolean(localStorage.getItem('darked')))

    const darked = isDark ? 'is-dark' : ''

    const main = (() => {

        switch (content) {

            case 'note':
                return <Note userId={userId} note={note} isDark={isDark} />
                break;
            case 'calendar':
                return <Calendar userId={userId} notes={notes} errors={errors} csrf={csrf} isDark={isDark} date={date} />
                break
            case 'dialry':
                return <DialryForm userId={userId} csrf={csrf} errors={errors} date={date} isDark={isDark} />
                break
            default:
                return <NoteList userId={userId} isDark={isDark} />
                break
        }

    })()

    return (
        <>
            <header id="header" className={'l-header ' + darked}>
                <div className="l-header__inner">
                    <h1 className="c-heading--large">lifenote</h1>
                    {isLogin && <ToggleDarkButton userId={userId} isDark={isDark} setIsDark={setIsDark} />}
                </div>
            </header>
            <div id='wrapper' className={'l-wrapper ' + (isDark ? 'is-dark' : '')}>
                <Nav csrf={csrf} isDark={isDark}/>
                <main id="main" className="l-wrapper__inner">
                    {main}
                </main>
            </div>
        </>
    )
}

const Element = document.getElementById('app');
if (Element) {
    const userId = Element.getAttribute('userId')
    const parsedUserId = JSON.parse(userId)
    const isLogin = Element.getAttribute('isLogin')
    const csrf = Element.getAttribute('csrf')
    const parsedCsrf = JSON.parse(csrf)
    const parsedIsLogin = JSON.parse(isLogin)
    const content = Element.getAttribute('content')
    const parsedContent = JSON.parse(content)
    const errors = Element.getAttribute('errors')
    const parsedErrors = JSON.parse(errors)
    const date = Element.getAttribute('date')
    const parsedDate = JSON.parse(date)
    const notes = Element.getAttribute('notes')
    const parsedNotes = JSON.parse(notes)
    const note = Element.getAttribute('note')
    const parsedNote = JSON.parse(note)
    ReactDOM.render(<App userId={parsedUserId}
        isLogin={parsedIsLogin}
        csrf={parsedCsrf}
        content={parsedContent}
        errors={parsedErrors}
        date={parsedDate}
        notes={parsedNotes}
        note={parsedNote} />, Element);
}
