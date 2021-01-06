import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { settingContext } from './App'

const Nav = (props) => {

    console.log(props.csrf)
    const useSettingContext = useContext(settingContext)

    const { color, setColor } = useSettingContext.colorMode

    const  isDark = useSettingContext.darkMode.isDark

    console.log(isDark)

    useEffect(() => {
        document.addEventListener('scroll', handeleScroll)

        return () => document.removeEventListener('scroll', handeleScroll)
    }, [])

    const handeleScroll = () => {
        let height = document.getElementById('header').offsetHeight
        const nav = document.getElementById('nav')
        const main = document.getElementById('main')
        const header = document.getElementById('header')

        if (document.documentElement.scrollTop > height) {

            nav.classList.add('is-fixed')
            let headerHeight = header.offsetHeight
            let navWidth = nav.offsetWidth

            main.style.marginLeft = navWidth += 'px'
        } else {

            nav.classList.remove('is-fixed')
            main.style.marginLeft = 0
        }
    }

    return (
        <>
            <nav id="nav" className={'l-nav ' + (isDark ? 'is-dark' : '')}>
                <ul className="c-list">
                    <li className={'c-list__item ' + (isDark ? 'is-dark' : '')}><a href="http://localhost:8888/lifenote/public/home">home</a></li>
                    <li className={'c-list__item ' + (isDark ? 'is-dark' : '')}><a href="http://localhost:8888/lifenote/public/calendar">calendar</a></li>
                    <li className={'c-list__item ' + (isDark ? 'is-dark' : '')}><a href="http://localhost:8888/lifenote/public/notes/create">dialry</a></li>
                    <li className={'c-list__item ' + (isDark ? 'is-dark' : '')}><form method="post" action="http://localhost:8888/lifenote/public/logout"><button type="submit" name="_token" value={props.csrf}>logout</button></form></li>
                </ul>
            </nav>
        </>
    )
}

export default Nav
