import React, { useEffect } from 'react'
import { route } from '../functions'

const Nav = ({ mediaScreenL, isDark, theme, getTheme }) => {

    useEffect(() => {

        document.addEventListener('scroll', handleScroll)

        return () => document.removeEventListener('scroll', handleScroll)

    }, [])

    const handleScroll = () => {

        const nav = document.getElementById('nav')

        const navWidth = nav.offsetWidth

        const header = document.getElementById('header')

        const main = document.getElementById('main')

        const mainWidth = main.offsetWidth

        const wrapper = document.getElementById('wrapper')

        const headerHeight = header.offsetHeight

        if (window.pageYOffset > headerHeight && !nav.classList.contains('is-bottom') && mediaScreenL) {
            nav.classList.add('is-fixed')
            wrapper.style.marginLeft = navWidth + 'px'
            main.style.width = mainWidth + 'px'
        } else {
            nav.classList.remove('is-fixed')
            wrapper.style.marginLeft = 0
        }
    }

    return (
        <>
            <nav id="nav" className={'l-nav' + (isDark ? ' is-dark' : '') + (!mediaScreenL ? ' is-bottom' : '') + (getTheme(theme))}>
                <ul className={"c-list" + (!mediaScreenL ? ' is-row' : '')}>
                    <li className={'c-list__item ' + (isDark ? ' is-dark' : '') + (!mediaScreenL ? ' is-row' : '') + (getTheme(theme))}><a href={route('home')}>Home</a></li>
                    <li className={'c-list__item ' + (isDark ? ' is-dark' : '') + (!mediaScreenL ? ' is-row' : '') + (getTheme(theme))}><a href={route('calendar')}>Calendar</a></li>
                    <li className={'c-list__item ' + (isDark ? ' is-dark' : '') + (!mediaScreenL ? ' is-row' : '') + (getTheme(theme))}><a href={route('notes.create')}>Dialry</a></li>
                    <li className={'c-list__item ' + (isDark ? ' is-dark' : '') + (!mediaScreenL ? ' is-row' : '') + (getTheme(theme))}><a href={route('settings')}>Settings</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Nav
