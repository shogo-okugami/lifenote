import React from 'react'
import ToggleDarkButton from './ToggleDarkButton'
import AutoDarked from './AutoDarked'

const DarkSetting = () => {
    return (
        <div className={'p-settings__group'}>
            <ToggleDarkButton />
            <AutoDarked />
        </div>
    )
}

export default DarkSetting
