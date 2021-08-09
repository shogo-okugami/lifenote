import React from 'react'
import ToggleDarkButton from '../ToggleDarkButton/ToggleDarkButton'
import AutoDarked from '../AutoDarked/AutoDarked'

const DarkSetting = () => {
    return (
        <div className={'p-settings__group--dark'}>
            <ToggleDarkButton />
            <AutoDarked />
        </div>
    )
}

export default DarkSetting
