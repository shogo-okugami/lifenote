import React, { useState, useEffect, createContext, useContext, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import NoteList from './NoteList'
import Calendar from './Calendar'
import ToggleDarkButton from './ToggleDarkButton'

const settingContext = createContext()

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

const App = (props) => {

    const colors = ['normal', 'red', 'blue', 'yellow', 'green', 'pink']

    const [color, setColor] = useState(colors[Number(localStorage.getItem('color'))])

    const [isDark, setIsDark] = useState(Boolean(localStorage.getItem('darked')))

    const darked = isDark ? 'is-dark' : ''

    const content = () => {

        switch (props.content) {

            case 'note':
                return <NoteList userId={props.userId} />
                break;
            case 'calendar':
                return <Calendar />
                break
            case 'diary':
                return <Diary />
                break
            default:
                return <NoteList userId={props.userId} />
                break
        }

    }

    return (
        <>
            <settingContext.Provider value={{ colorMode: { color: color, setColor: setColor }, darkMode: { isDark: isDark, setIsDark: setIsDark } }}>
                <header id="header" className={'l-header ' + darked}>
                    <div className="l-header__inner">
                        <h1 className="c-heading--large">lifenote</h1>
                        {props.isLogin && <ToggleDarkButton userId={props.userId} />}
                    </div>
                </header>

                <main id="main" className={'l-wrapper ' + (isDark ? 'is-dark' : '')}>
                    <Nav csrf={props.csrf} />
                    <div className="l-wrapper__inner">
                        {content()}
                    </div>
                </main>
            </settingContext.Provider>
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
    ReactDOM.render(<App userId={parsedUserId} isLogin={parsedIsLogin} csrf={parsedCsrf} content={parsedContent} />, Element);
}

export { settingContext }
