import React, { useContext } from 'react'
import Navigation from '../Navigation/Navigation'
import { getDark, getTheme, getClassName } from '../../functions'
import { app } from '../App/useApp'

const Wrapper = ({ main }) => {

    const { user: { isLogin }, darked: { isDark }, theme: { theme }, mediaScreenL } = useContext(app)

    return (
        <div id='wrapper' className={'l-wrapper' + (getClassName(mediaScreenL, 'is-row')) + (getDark(isDark, isLogin)) + (getTheme({ theme, isDark, isLogin }))}>
            {isLogin && <Navigation />}
            <main id="main" className="l-wrapper__inner">
                {main}
            </main>
        </div>
    )
}

export default Wrapper
