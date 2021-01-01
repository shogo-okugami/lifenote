import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Nav = () => {

    const [isFixed, setIsFixed] = useState(false)

    useEffect(() => {
        document.addEventListener('scroll', handeleScroll)

        //return () => document.removeEventListener('scroll',handeleScroll)
    }, [])

    const handeleScroll = () => {
        let height = document.getElementById('header').offsetHeight
        if (document.documentElement.scrollTop > height) {
            console.log('true')
            setIsFixed(true)
        } else {
            console.log('false')
            setIsFixed(false)
        }
    }

    const nav = document.getElementById('nav')
    const main = document.getElementById('main')

    if (isFixed) {

        nav.classList.add('is-fixed')
        let navWidth = nav.offsetWidth

        console.log(navWidth)
        main.style.marginLeft = navWidth += 'px'
    } else {
        nav.classList.remove('is-fixed')
        main.style.marginLeft = 0
    }


    return (
        <>
            <nav>
                <ul className="c-list">
                    <li className="c-list__item"><a href="home">home</a></li>
                    <li className="c-list__item"><a href="calendar">calendar</a></li>
                    <li className="c-list__item"><a href="notes/create">dialry</a></li>
                    <li className="c-list__item"><a>logout</a></li>
                </ul>
            </nav>
        </>
    )
}

const Element = document.getElementById('nav')
if (Element) {
    ReactDOM.render(<Nav isFixed={false} />, Element);
}
