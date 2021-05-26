import React from 'react'

const AutoDarked = ({ autoDarked, setAutoDarked, isDark, setIsDark }) => {

    const handleClick = () => {
        //自動切り替えONの場合かつダークモードONの場合
        if (autoDarked && isDark) {
            //ダークモードをOFFにする
            localStorage.setItem('darked','')
            setIsDark(false)
        } else {
            const darkeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const darkeModeOn = darkeMediaQuery.matches
            localStorage.setItem('darked',darkeModeOn ? 'on' : '')
            setIsDark(darkeModeOn)
        }
        //ローカルストレージに保存
        localStorage.setItem('auto_darked', autoDarked ? '' : 'on')
        //state autoDarkedを更新
        setAutoDarked(!autoDarked)
    }
    return (
        <button onClick={() => handleClick()} className={'c-btn--toggle' + (autoDarked ? ' is-on' : '')}><span /></button>
    )

}

export default AutoDarked
