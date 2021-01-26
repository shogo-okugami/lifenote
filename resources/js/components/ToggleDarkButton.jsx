import React, { useState } from 'react';

const ToggleDarkButton = ({ isDark, setIsDark }) => {

    const handleClick = () => {

        localStorage.setItem('darked', isDark ? '' : 'on')

        setIsDark(!isDark)

    }

    return (
        <>
            <div className={'c-btn--toggleDark' + (isDark ? ' is-dark' : '')} onClick={() => handleClick()}><span><img src="http://localhost:8888/lifenote/public/images/moon.svg" /></span></div>
        </>
    )

}

export default ToggleDarkButton
