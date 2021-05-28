import React, { useContext } from 'react'
import { AppSettings } from '../App'
import FontFamily from './FontFamily'
import FontSize from './FontSize'

const FontSetting = ({ setIsOver }) => {

    const isDark = useContext(AppSettings).darked.isDark

    return (
        <div className={'p-settings__group--font'}>
            <h2 className={isDark ? ' is-dark' : ''}>Font</h2>
            <FontFamily setIsOver={setIsOver} />
            <FontSize />
        </div>
    )
}

export default FontSetting
