import { useState, useEffect, useRef, useContext, useCallback } from 'react'
import { app } from '../../App/useApp'

const useThemeSetting = (setIsOver) => {

    const { darked: { isDark }, theme: { theme, setTheme } } = useContext(app)

    const themes = ['light', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'indigo', 'pink', 'teal', 'brown', 'cyan']

    const [isShow, setIsShow] = useState(false)

    const modalRef = useRef(null)

    const handleClick = useCallback((theme) => {
        localStorage.setItem('theme', theme)
        setTheme(theme)
        setIsShow(false)
        setIsOver(false)
    }, [])

    useEffect(() => {
        isShow && modalRef.current.focus()
    }, [isShow])

    return { isDark, theme, themes, isShow, setIsShow, modalRef, handleClick }
}

export default useThemeSetting
