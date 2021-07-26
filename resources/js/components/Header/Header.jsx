import React, { useContext } from 'react'
import { route, getDark, getTheme } from '../../functions'
import { app } from '../App/useApp'

const Header = () => {

    const { user: { isLogin }, darked: { isDark }, theme: { theme } } = useContext(app)

    return (
        <header id="header" className={'l-header' + (getDark(isDark, isLogin)) + (getTheme({ theme, isDark, isLogin }))}>
            <div className={'l-header__title' + (getDark(isDark, isLogin)) + (getTheme({ theme, isDark, isLogin }))}>
                <h1><a className={'c-heading--large' + (getDark(isDark, isLogin))} href={route('home')}>lifenote</a></h1>
            </div>
            <div className={'l-header__rest' + (getDark(isDark, isLogin)) + (getTheme({ theme, isDark, isLogin }))} />
        </header>
    )
}

export default Header
