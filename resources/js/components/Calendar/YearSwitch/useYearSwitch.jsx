import { useState, useContext } from 'react'
import { app } from '../../App/useApp'

const useYearSwitch = (setCalendar) => {

    const { user: { userId }, darked: { isDark } } = useContext(app)

    const [isShow, setIsShow] = useState(false)

    const handleClick = (year, month) => {
        (async () => {
            try {
                const res = await fetch(`api/users/${userId}/notes/${String(year) + '-' + (month < 10 ? '0' + String(month) : String(month))}`)
                const resp = await res.json()
                setCalendar({ date: new Date(year, month), notes: resp })
            } catch (error) {
                console.log(error)
            }
        })()
    }

    return { isDark, isShow, setIsShow, handleClick }
}

export default useYearSwitch
