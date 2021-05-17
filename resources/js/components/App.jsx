import React, { useState, useEffect, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import NoteList from './NoteList'
import Note from './Note'
import Calendar from './Calendar'
import DialryForm from './DialryForm'
import ToggleDarkButton from './ToggleDarkButton'
import { route } from '../functions'

const App = ({ userId, isLogin, csrf, content, errors, date, notes, note }) => {

    const [isDark, setIsDark] = useState(Boolean(localStorage.getItem('darked')))
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
                document.body.style.height = 'auto'
                document.body.style.paddingBottom = document.getElementById('nav').offsetHeight + 'px'
                resized.current = false
            }
            //PC画面の場合
        } else {
            const header = document.getElementById('header')
            header.style.height = ''
            document.body.style.paddingBottom = ''
            document.body.style.height = ''
            if (resized.current) resized.current = false
        }
    }, [mediaScreenL])

    const main = useMemo(() => {
        switch (content) {
            case 'note':
                return <Note userId={userId} note={note} csrf={csrf} isDark={isDark} mediaScreenL={mediaScreenL} />
                break
            case 'calendar':
                return <Calendar userId={userId} mediaScreenL={mediaScreenL} notes={notes} errors={errors} csrf={csrf} isDark={isDark} date={date} />
                break
            case 'dialry':
                return <DialryForm userId={userId} csrf={csrf} note={note} errors={errors} date={date} isDark={isDark} mediaScreenL={mediaScreenL} />
                break
            default:
                return <NoteList userId={userId} isDark={isDark} mediaScreenL={mediaScreenL} />
                break
        }
    }, [isDark, mediaScreenL])

    return (
        <>
            <header id="header" className={'l-header' + (isDark ? ' is-dark' : '')}>
                <div className="l-header__inner">
                    <h1><a className={'c-heading--large' + (isDark ? ' is-dark' : '')} href={route('home')}>lifenote</a></h1>
                    {isLogin && <ToggleDarkButton userId={userId} isDark={isDark} setIsDark={setIsDark} />}
                </div>
            </header>
            <div id='wrapper' className={'l-wrapper' + (mediaScreenL ? '--row' : '') + (isDark ? ' is-dark' : '')}>
                <Nav csrf={csrf} isDark={isDark} mediaScreenL={mediaScreenL} />
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
