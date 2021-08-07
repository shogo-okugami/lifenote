import { useState, useRef, useEffect, useContext, useCallback } from "react"
import { app } from '../../App/useApp'

const useFontSize = () => {

    const [isShow, setIsShow] = useState(false)
    const sizes = ['standard', 'medium', 'large']
    const size = localStorage.getItem('font_size') ? sizes.find(element => element === localStorage.getItem('font_size')) : 'standard'
    const menuRef = useRef(null)
    const { isDark } = useContext(app).darked

    const handleClick = useCallback((value) => {
        localStorage.setItem('font_size', value)
        setIsShow(false)
    }, [])

    useEffect(() => {
        isShow && menuRef.current.focus()
    }, [isShow])

    return { isShow, setIsShow, sizes, size, menuRef, isDark, handleClick }
}

export default useFontSize
