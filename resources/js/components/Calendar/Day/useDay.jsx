import { useContext } from 'react';
import { app } from '../../App/useApp';
import { route } from '../../../functions';

const useDay = (date, notesDates, setNote, setInputDateValue) => {

    const { user: { userId }, darked: { isDark }, mediaScreenL } = useContext(app)
    const { year, month, dayOfweek, day, today } = date

    const handleClick = async (userId, action, ...dates) => {

        const paramDate = dates.map(num => num < 10 ? '0' + String(num) : String(num)).join('-')

        try {
            const res = await fetch(`api/users/${userId}/note/${paramDate}`)
            const resp = await res.json()
            switch (action) {
                case 'redirect':
                    if (resp.length) {
                        const id = resp[0].id
                        window.location.href = route('notes.show', [id])
                    } else {
                        window.location.href = route('notes.create', [paramDate])
                    }
                    break
                case 'switch':
                    if (resp.length) {
                        setInputDateValue(today)
                        setNote({ note: resp[0], exists: true })
                    } else {
                        setInputDateValue(paramDate)
                        setNote({ note: null, exists: false })
                    }
                    break
            }
        } catch (error) {
            console.log(error)
        }
    }

    const findDate = (...dates) => notesDates.includes(dates.map(num => num < 10 ? '0' + String(num) : String(num)).join('/'))

    const getDate = (...dates) => dates.map(num => num < 10 ? '0' + String(num) : String(num)).join('/')

    const flag = findDate(year, month, day)

    const isToday = today === getDate(year, month, day)

    return { userId, isDark, mediaScreenL, flag, isToday, handleClick, year, month, dayOfweek, day, }
}

export default useDay
