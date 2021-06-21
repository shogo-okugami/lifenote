import React, { useState, useEffect, useRef, useMemo, createContext } from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import LoginForm from './Auth/LoginForm'
import RegisterForm from './Auth/RegisterForm'
import NoteList from './Note/NoteList'
import Note from './Note/Note'
import Calendar from './Calendar/Calendar'
import DialryForm from './Form/DialryForm'
import Settings from './Settings/Settings'
import { route } from '../functions'

export const AppSettings = createContext(null)

const App = ({ userId, isLogin, csrf, content, errors, date, notes, note }) => {

    const [autoDarked, setAutoDarked] = useState(Boolean(localStorage.getItem('auto_darked'))) // state.autoDarked
    const darkeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)') // window.matchMediaオブジェクトの値を格納
    const darkeModeOn = darkeMediaQuery.matches // OSのダークモードを判定
    // state.isDark
    const [isDark, setIsDark] = useState(() => {
        // ダークモード自動切り替えがONの場合
        if (autoDarked) {
            return darkeModeOn
        } else {
            return Boolean(localStorage.getItem('darked'))
        }
    })

    //OSのダークモードを監視し、変更されたタイミングで関数を実行する
    useEffect(() => {
        if (autoDarked) {
            darkeMediaQuery.addEventListener('change', handleAutoDarke)
        }
        return () => darkeMediaQuery.removeEventListener('change', handleAutoDarke)
    }, [autoDarked])

    // OSに連動してダークモードを切り替える
    const handleAutoDarke = () => {
        darkeMediaQuery.matches ? setIsDark(true) : setIsDark(false)
    }

    const [theme, setTheme] = useState(localStorage.getItem('theme')) //テーマ定数、set関数を定義
    const getTheme = (theme, isLogin = true, ignored = false) => {
        if (isLogin) {
            //themeがnullではない、またはlightではない場合
            if (theme !== 'light' || theme !== null) {
                //ダークモード時にもスタイルを適用する場合
                if (ignored) {
                    return theme !== 'light' ? ` is-${theme}` : ''
                    //ダークモード時はスタイルを適用しない場合
                } else {
                    return !isDark ? theme !== 'light' ? ` is-${theme}` : '' : ''
                }
            } else {
                return ''
            }
        } else {
            return ''
        }
    }
    const [font, setFont] = useState(localStorage.getItem('font'))
    useEffect(() => {
        document.body.style.fontFamily = (isLogin && font) || ''
    }, [font])
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth) //ウィンドウの横幅
    const resized = useRef(false) //ウィンドウのリサイズ判定
    const mediaScreenL = windowWidth >= 960 //PC画面の判定
    //リサイズイベントを追加する
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [document.documentElement.clientWidth])

    const handleResize = () => {
        setTimeout(() => {
            //ウィンドウ幅を更新
            setWindowWidth(document.documentElement.clientWidth)
            //リサイズ判定をtrueにする
            resized.current = true
        }, 300);
    }
    //ウィンドウ幅が更新された際に変更されたstyle属性をリセット
    useEffect(() => {
        //SP画面の場合
        if (!mediaScreenL) {
            const main = document.getElementById('main')
            main.style.width = ''
            const wrapper = document.getElementById('wrapper')
            wrapper.style.marginLeft = ''
            //リサイズされていた場合
            if (resized.current) {
                const header = document.getElementById('header')
                header.style.height = header.offsetHeight + 'px'
                resized.current = false
            }
            //PC画面の場合
        } else {
            const header = document.getElementById('header')
            header.style.height = ''
            const wrapper = document.getElementById('wrapper')
            wrapper.style.marginLeft = 0
            document.body.style.paddingBottom = ''
            document.body.style.height = ''
            if (resized.current) resized.current = false
        }
    }, [mediaScreenL, theme, isDark])

    const [paddingBottom, setPaddingBottom] = useState(null) //paddingBottomとset関数を定義

    // ホーム画面又は設定画面でbodyのheightをautoに指定
    // 設定画面でボトムナビゲーションを表示する際はpaddingBottomを指定してbodyを底上げする
    useEffect(() => {
        if (content === 'notes' || content === 'settings') {
            document.body.style.height = 'auto'
            if (content === 'settings') {
                document.body.style.paddingBottom = paddingBottom + 'px'
            }
        }
    }, [content, paddingBottom])

    const main = useMemo(() => {
        switch (content) {
            case 'login':
                return <LoginForm csrf={csrf} isLogin={isLogin} />
            case 'register':
                return <RegisterForm csrf={csrf} isLogin={isLogin} errors={errors} />
            case 'note':
                return <Note userId={userId} note={note} csrf={csrf} isDark={isDark} mediaScreenL={mediaScreenL} />
            case 'calendar':
                return <Calendar userId={userId} mediaScreenL={mediaScreenL} notes={notes} errors={errors} csrf={csrf} isDark={isDark} date={date} />
            case 'dialry':
                return <DialryForm userId={userId} csrf={csrf} note={note} errors={errors} date={date} isDark={isDark} mediaScreenL={mediaScreenL} />
            case 'settings':
                return <Settings userId={userId} mediaScreenL={mediaScreenL} />
            default:
                return <NoteList userId={userId} isDark={isDark} notes={notes} mediaScreenL={mediaScreenL} />
        }
    }, [autoDarked, isDark, mediaScreenL])

    return (
        <AppSettings.Provider value={{ darked: { isDark: isDark, setIsDark: setIsDark }, theme: { theme: theme, setTheme: setTheme, getTheme: getTheme }, font: { setFont: setFont }, autoDarked: { autoDarked: autoDarked, setAutoDarked: setAutoDarked }, csrf: csrf, mediaScreenL: mediaScreenL }} >
            <header id="header" className={'l-header' + (isLogin && isDark ? ' is-dark' : '') + (getTheme(theme, isLogin))}>
                <div className={'l-header__title' + (isLogin && isDark ? ' is-dark' : '') + (getTheme(theme, isLogin))}>
                    <h1><a className={'c-heading--large' + (isLogin && isDark ? ' is-dark' : '')} href={route('home')}>lifenote</a></h1>
                </div>
                <div className={'l-header__rest' + (isLogin && isDark ? ' is-dark' : '') + (getTheme(theme, isLogin))} />
            </header>
            <div id='wrapper' className={'l-wrapper' + (mediaScreenL ? ' is-row' : '') + (isLogin && isDark ? ' is-dark' : '') + (getTheme(theme, isLogin))}>
                {isLogin && <Nav csrf={csrf} isDark={isDark} theme={theme} getTheme={getTheme} mediaScreenL={mediaScreenL} setPaddingBottom={setPaddingBottom} />}
                <main id="main" className="l-wrapper__inner">
                    {main}
                </main>
            </div>
        </AppSettings.Provider>
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
