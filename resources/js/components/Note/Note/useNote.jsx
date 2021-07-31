import { useContext } from "react"
import { app } from '../../App/useApp'

const useNote = () => {

    const { darked: { isDark }, theme: { theme }, mediaScreenL, csrf } = useContext(app)

    const size = localStorage.getItem('font_size')

    return { isDark, theme, mediaScreenL, csrf, size }
}

export default useNote
