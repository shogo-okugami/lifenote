import { useContext } from "react"
import { app } from '../../App/useApp'
import months from '../../../months'

const useDateHeading = (text) => {

    const { darked: { isDark }, theme: { theme } } = useContext(app)

    //日付を英名＋年に変換
    const date = (() => {
        let date = text.split('/')
        const year = date[0]
        const month = months[Number(date[1] - 1)]
        return month + ' ' + year
    })()

    return { isDark, theme, date }
}

export default useDateHeading
