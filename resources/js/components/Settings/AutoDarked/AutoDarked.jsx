import React from 'react'
import { getClassName } from '../../../functions'
import useAutoDarked from './useAutoDarked'

const AutoDarked = () => {

    const { autoDarked, handleClick } = useAutoDarked()

    return (
        <div className='p-settings__item'>
            <p>auto dark mode</p>
            <button onClick={() => handleClick()} className={'c-btn--toggle' + getClassName(autoDarked, 'is-on')}><span /></button>
        </div>
    )
}

export default AutoDarked
