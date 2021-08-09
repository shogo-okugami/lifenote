import { useContext, useCallback } from 'react';
import { app } from '../../App/useApp'

const useToggleDarkButton = () => {

    const { darked: { isDark, setIsDark }, autoDarked: { autoDarked, setAutoDarked } } = useContext(app)

    const handleClick = useCallback(() => {
        localStorage.setItem('darked', isDark ? '' : 'on')
        if (autoDarked) {
            localStorage.setItem('auto_darked', '')
            setAutoDarked(false)
        }
        setIsDark(!isDark)
    }, [isDark])

    return { isDark, handleClick }
}

export default useToggleDarkButton
