import React, { useContext } from 'react'
import { app } from '../../App/useApp'
import FontFamily from '../FontFamily/FontFamily'
import FontSize from '../FontSize/FontSize'
import { getDark } from '../../../functions'

const FontSetting = ({ setIsOver }) => {

    const { isDark } = useContext(app).darked

    return (
        <div className={'p-settings__group--font'}>
            <h2 className={getDark(isDark)}>Font</h2>
            <FontFamily setIsOver={setIsOver} />
            <FontSize />
        </div>
    )
}

export default FontSetting
