import React from 'react'
import { useApp } from './useApp'
import { getClassName, getDark, getTheme } from '../../functions'
import Navigation from '../Navigation/Navigation'
import Header from '../Header/Header'

const App = ({ userId, isLogin, csrf: token, content, errors, date, notes, note }) => {

    const { AppContext, isDark, setIsDark, theme, setTheme, setFont, autoDarked, setAutoDarked, csrf, mediaScreenL, main, setPaddingBottom } = useApp(isLogin, token, content, errors, date, notes, note)

    return (
        <AppContext.Provider value={{ user: { userId, isLogin }, darked: { isDark, setIsDark }, theme: { theme, setTheme }, font: { setFont }, autoDarked: { autoDarked, setAutoDarked }, csrf, mediaScreenL }} >
            <Header />
            <div id='wrapper' className={'l-wrapper' + (getClassName(mediaScreenL, 'is-row')) + (getDark(isDark, isLogin)) + (getTheme({ theme, isDark, isLogin }))}>
                {isLogin && <Navigation setPaddingBottom={setPaddingBottom} />}
                <main id="main" className="l-wrapper__inner">
                    {main}
                </main>
            </div>
        </AppContext.Provider>
    )
}



export default App
