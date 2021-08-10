import { useContext, useCallback } from "react"
import { app } from '../../App/useApp'

const useAutoDarked = () => {

    const { darked: { isDark, setIsDark }, autoDarked: { autoDarked, setAutoDarked } } = useContext(app)

    const handleClick = useCallback(() => {
        //自動切り替えONの場合かつダークモードONの場合
        if (autoDarked && isDark) {
            //ダークモードをOFFにする
            localStorage.setItem('darked', '')
            setIsDark(false)
        } else {
            const darkeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const darkeModeOn = darkeMediaQuery.matches
            localStorage.setItem('darked', darkeModeOn ? 'on' : '')
            setIsDark(darkeModeOn)
        }
        //ローカルストレージに保存
        localStorage.setItem('auto_darked', autoDarked ? '' : 'on')
        //state autoDarkedを更新
        setAutoDarked(!autoDarked)
    }, [autoDarked])

    return { autoDarked, handleClick }
}

export default useAutoDarked
