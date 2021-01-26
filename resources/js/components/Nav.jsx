import React, { useState, useEffect, useContext } from 'react'
import { settingContext } from './App'

const Nav = ({ csrf }) => {

    const useSettingContext = useContext(settingContext)

    const { color, setColor } = useSettingContext.colorMode

    const isDark = useSettingContext.darkMode.isDark

    useEffect(() => {

        document.addEventListener('scroll', handeleScroll)

        return () => document.removeEventListener('scroll', handeleScroll)

    }, [])

    useEffect (() =>{

      document.body.style.background = isDark ? '#222' : '#fff'

    },[isDark])

    const handeleScroll = () => {

        const nav = document.getElementById('nav')

        const navWidth = nav.offsetWidth

        const header = document.getElementById('header')

        const main = document.getElementById('main')

        const headerHeight = header.offsetHeight

        if (window.pageYOffset > headerHeight) {

            nav.classList.add('is-fixed')
            main.style.marginLeft = navWidth + 'px'

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
                    <li className={'c-list__item ' + (isDark ? 'is-dark' : '')}><form method="post" action="http://localhost:8888/lifenote/public/logout"><button type="submit" name="_token" value={csrf}>logout</button></form></li>
                </ul>
            </nav>
        </>
    )
}

export default Nav
