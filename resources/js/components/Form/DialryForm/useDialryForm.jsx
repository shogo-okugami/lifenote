import { useContext } from 'react'
import { app } from '../../App/useApp'

const useDialryForm = (note, date) => {

    const { user: { userId }, darked: { isDark }, theme: { theme }, mediaScreenL, csrf } = useContext(app)
    const editFlag = Boolean(note)
    const dateOfNote = date.replace(/-/g, '/')

    return { userId, isDark, theme, mediaScreenL, csrf, editFlag, dateOfNote }
}

export default useDialryForm
