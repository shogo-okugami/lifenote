import React, { useContext } from 'react'
import { AppSettings } from '../App'

const AutoDarked = () => {

    const { autoDarked, setAutoDarked } = useContext(AppSettings).autoDarked
    const { isDark, setIsDark } = useContext(AppSettings).darked

    const handleClick = () => {
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
    }

    return (
        <div className='p-settings__item'>
            <p>auto dark mode</p>
            <button onClick={() => handleClick()} className={'c-btn--toggle' + (autoDarked ? ' is-on' : '')}><span /></button>
        </div>
    )
}

export default AutoDarked
