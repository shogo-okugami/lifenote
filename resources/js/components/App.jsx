import React, { useState, useEffect, createContext, useContext, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import NoteList from './NoteList'
import Calendar from './Calendar'
import DialryForm from './DialryForm'
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

const App = ({userId,isLogin,csrf,content,errors,date}) => {

    const colors = ['normal', 'red', 'blue', 'yellow', 'green', 'pink']

    const [color, setColor] = useState(colors[Number(localStorage.getItem('color'))])

    const [isDark, setIsDark] = useState(Boolean(localStorage.getItem('darked')))

    const darked = isDark ? 'is-dark' : ''

    console.log('App render')

    const main = (() => {

        switch (content) {

            case 'note':
                return <NoteList userId={userId} />
                break;
            case 'calendar':
                return <Calendar />
                break
            case 'dialry':
                return <DialryForm userId={userId} csrf={csrf} errors={errors} date={date} isDark={isDark} />
                break
            default:
                return <NoteList userId={userId} />
                break
        }

    })()

    return (
        <>
            <settingContext.Provider value={{ colorMode: { color: color, setColor: setColor }, darkMode: { isDark: isDark, setIsDark: setIsDark } }}>
                <header id="header" className={'l-header ' + darked}>
                    <div className="l-header__inner">
                        <h1 className="c-heading--large">lifenote</h1>
                        {isLogin && <ToggleDarkButton userId={userId} />}
                    </div>
                </header>

                <Nav csrf={csrf} />
                <main id="main" className={'l-wrapper ' + (isDark ? 'is-dark' : '')}>
                    <div className="l-wrapper__inner">
                        {main}
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
    const errors = Element.getAttribute('errors')
    const parsedErrors = JSON.parse(errors)
    const date = Element.getAttribute('date')
    const parsedDate = JSON.parse(date)
    ReactDOM.render(<App userId={parsedUserId} isLogin={parsedIsLogin} csrf={parsedCsrf} content={parsedContent} errors={parsedErrors} date={parsedDate} />, Element);
}

export { settingContext }
