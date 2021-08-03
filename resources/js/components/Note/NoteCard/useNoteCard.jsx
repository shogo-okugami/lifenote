import { useContext } from "react"
import { app } from '../../App/useApp'
import weeks from '../../../weeks'

const useNoteCard = (data, monthlyHeading) => {

    const { darked: { isDark } } = useContext(app)

    const note = data //ノートを格納

    //ノートの日付(d)と曜日を返す関数
    const date = (() => {
        const array = note.date.split('/').map(value => parseInt(value))
        const date = new Date(array[0], array[1] - 1, array[2])
        const result = { day: date.getDate(), Ofweek: weeks[date.getDay()] }
        return result
    })()

    const dateOfHeading = monthlyHeading.current //各ノートの月毎の日付を格納
    monthlyHeading.current = note.date.slice(0, 7) //ノートの日付(Y/m)を格納

    return { isDark, note, date, dateOfHeading }
}

export default useNoteCard
