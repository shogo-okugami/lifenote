import React from 'react'
import { useApp } from './useApp'
import Header from '../Header/Header'
import Wrapper from '../Wrapper/Wrapper'

const App = ({ userId, isLogin, csrf: token, content, errors, date, notes, note }) => {

    const { AppContext, isDark, setIsDark, theme, setTheme, setFont, autoDarked, setAutoDarked, csrf, mediaScreenL, main } = useApp(isLogin, token, content, errors, date, notes, note)

    return (
        <AppContext.Provider value={{ user: { userId, isLogin }, darked: { isDark, setIsDark }, theme: { theme, setTheme }, font: { setFont }, autoDarked: { autoDarked, setAutoDarked }, csrf, mediaScreenL }} >
            <Header />
            <Wrapper main={main} />
        </AppContext.Provider>
    )
}



export default App
