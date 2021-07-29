import { useState, useEffect, useRef, useContext } from 'react'
import { app } from '../../App/useApp'

const useMonthMenu = (setCalendar) => {

    const { user: { userId }, darked: { isDark } } = useContext(app)
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        isOpen && menuRef.current.focus()
    }, [isOpen])

    const handleClick = (year, month) => {
        (async () => {
            try {
                const res = await fetch(`api/users/${userId}/notes/${String(year) + '-' + (month + 1 < 10 ? '0' + String(month + 1) : String(month + 1))}`)
                const resp = await res.json()
                setCalendar({ date: new Date(year, month), notes: resp })
            } catch (error) {
                console.log(error)
            }

        })()
    }

    return { isDark, isOpen, setIsOpen, menuRef, handleClick }
}

export default useMonthMenu
