import { useState, useEffect, useRef, useContext } from 'react'
import { app } from '../../App/useApp'
import { disableScroll } from '../../../functions'

const useThemeSetting = (setIsOver) => {

    const { darked: { isDark }, theme: { theme, setTheme }, mediaScreenL } = useContext(app)

    const themes = ['light', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'indigo', 'pink', 'teal', 'brown', 'cyan']

    const [isShow, setIsShow] = useState(false)

    const modalRef = useRef(null)

    const handleClick = (theme) => {
        localStorage.setItem('theme', theme)
        setTheme(theme)
        setIsShow(false)
        setIsOver(false)
    }

    useEffect(() => {
        const event = 'mousewheel'
        if (isShow) {
            modalRef.current.focus()
            mediaScreenL && document.addEventListener(event, disableScroll, { passive: false })
        }
        return () => document.removeEventListener(event, disableScroll)
    }, [isShow])

    return { isDark, theme, themes, isShow, setIsShow, modalRef, handleClick }
}

export default useThemeSetting
