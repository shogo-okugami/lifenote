import { useEffect, useContext } from "react";
import { app } from '../App/useApp'

const useNavigation = () => {

    const { darked: { isDark }, theme: { theme }, mediaScreenL } = useContext(app)

    const list = [{ name: 'Home', url: 'home' }, { name: 'Calendar', url: 'calendar' }, { name: 'Dialry', url: 'notes.create' }, { name: 'Settings', url: 'settings' },]

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

    return { isDark, theme, mediaScreenL, list }
}

export default useNavigation
