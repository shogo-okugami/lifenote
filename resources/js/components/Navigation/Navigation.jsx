import React from 'react'
import { route, getDark, getTheme, getClassName } from '../../functions'
import useNavigation from './useNavigation'

const Navigation = () => {

    const { isDark, theme, mediaScreenL, list } = useNavigation()

    return (
        <nav id="nav" className={'l-nav' + getDark(isDark) + getClassName(!mediaScreenL, 'is-bottom') + (getTheme({ theme, isDark }))}>
            <ul className={"c-list" + getClassName(!mediaScreenL, 'is-row')}>
                {list.map((value, index) => <li key={index} className={'c-list__item ' + getDark(isDark) + getClassName(!mediaScreenL, 'is-row') + getTheme({ theme, isDark })}><a href={route(value.url)}>{value.name}</a></li>)}
            </ul>
        </nav>
    )
}

export default Navigation
