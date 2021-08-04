import { useState, useRef, useEffect, useContext, useCallback } from 'react'
import { app } from '../../App/useApp'

const useDeleteAccount = () => {

    const { user: { userId }, darked: { isDark, getDark }, csrf, mediaScreenL } = useContext(app)

    const [isShow, setIsShow] = useState(false)
    const modalRef = useRef(false)

    useEffect(() => {
        const event = mediaScreenL ? 'mousewheel' : 'touchmove'
        if (isShow) {
            modalRef.current.focus()
            document.addEventListener(event, disableScroll, { passive: false })
        }
        return () => document.removeEventListener(event, disableScroll)
    }, [isShow])

    const disableScroll = useCallback(event => event.preventDefault(), [])

    const handleMouseDown = useCallback((form = document.getElementById('delete-form')) => form.submit(), [])

    return { userId, isDark, getDark, csrf, mediaScreenL, isShow, setIsShow, modalRef, handleMouseDown }
}

export default useDeleteAccount
