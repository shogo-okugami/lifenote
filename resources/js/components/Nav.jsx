import React, { useEffect } from 'react'

const Nav = ({ csrf,isDark }) => {


    useEffect(() => {

        document.addEventListener('scroll', handeleScroll)

        return () => document.removeEventListener('scroll', handeleScroll)

    }, [])

    useEffect (() =>{

      document.body.style.background = isDark ? '#111' : '#fff'

    },[isDark])

    const handeleScroll = () => {

        const nav = document.getElementById('nav')

        const navWidth = nav.offsetWidth

        const header = document.getElementById('header')

        const main = document.getElementById('main')

        const mainWidth = main.offsetWidth

        const wrapper = document.getElementById('wrapper')

        const headerHeight = header.offsetHeight

        if (window.pageYOffset > headerHeight) {

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
            <nav id="nav" className={'l-nav ' + (isDark ? 'is-dark' : '')}>
                <ul className="c-list">
                    <li className={'c-list__item ' + (isDark ? 'is-dark' : '')}><a href="http://localhost:8888/lifenote/public/">home</a></li>
                    <li className={'c-list__item ' + (isDark ? 'is-dark' : '')}><a href="http://localhost:8888/lifenote/public/calendar">calendar</a></li>
                    <li className={'c-list__item ' + (isDark ? 'is-dark' : '')}><a href="http://localhost:8888/lifenote/public/notes/create">dialry</a></li>
                    <li className={'c-list__item ' + (isDark ? 'is-dark' : '')}><form method="post" action="http://localhost:8888/lifenote/public/logout"><button type="submit" name="_token" value={csrf}>logout</button></form></li>
                </ul>
            </nav>
        </>
    )
}

export default Nav
