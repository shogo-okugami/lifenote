import React, { useState, useEffect, useMemo, createContext, useRef } from "react"
import ReactDOM from 'react-dom'
import LoginForm from '../Auth/LoginForm'
import RegisterForm from '../Auth/RegisterForm'
import NoteList from '../Note/NoteList/NoteList'
import Note from '../Note/Note/Note'
import Calendar from '../Calendar/Calendar/Calendar'
import DialryForm from '../Form/DialryForm/DialryForm'
import Settings from '../Settings/Settings/Settings'
import App from './App'
import { getDark, getTheme } from "../../functions"

const AppContext = createContext(null)
const app = AppContext

const useApp = (isLogin, csrf, content, errors, date, notes, note) => {

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
            darkeMediaQuery.addEventListener('change', handleAutoDark)
        }
        return () => darkeMediaQuery.removeEventListener('change', handleAutoDark)
    }, [autoDarked])

    // OSに連動してダークモードを切り替える
    const handleAutoDark = () => {
        darkeMediaQuery.matches ? setIsDark(true) : setIsDark(false)
    }

    const [theme, setTheme] = useState(localStorage.getItem('theme')) //テーマ定数、set関数を定義

    useEffect(() => {
        const colored = getTheme({ theme, isDark, isLogin, ignored: true }) || getDark(isDark, isLogin)
        const className = colored && (getDark(isDark, isLogin) || getTheme({ theme, isDark, isLogin })).substring(1)
        colored && document.body.classList.add(className)
        return () => colored && document.body.classList.remove(className)
    }, [isDark, theme])

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

    // ホーム画面又は設定画面でbodyのheightをautoに指定
    useEffect(() => {
        if (content === 'settings') {
            document.body.style.height = 'auto'
        }
    }, [content,isDark])

    const main = useMemo(() => {
        switch (content) {
            case 'login':
                return <LoginForm errors={errors} />
            case 'register':
                return <RegisterForm csrf={csrf} errors={errors} />
            case 'note':
                return <Note note={note} />
            case 'calendar':
                return <Calendar notes={notes} errors={errors} date={date} />
            case 'dialry':
                return <DialryForm note={note} errors={errors} date={date} />
            case 'settings':
                return <Settings />
            default:
                return <NoteList notes={notes} />
        }
    }, [autoDarked, isDark, mediaScreenL])

    return { AppContext, isDark, setIsDark, theme, setTheme, setFont, autoDarked, setAutoDarked, csrf, mediaScreenL, main }
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

export { useApp, app }
