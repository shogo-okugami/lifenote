import React from 'react'
import { getDark, getClassName, asset } from '../../../functions'
import useFontFamily from './useFontFamily'

const FontFamily = ({ setIsOver }) => {

    const { isDark, font, mediaScreenL, isShow, setIsShow, modalRef, client, disabled, fonts, handleClick } = useFontFamily(setIsOver)

    return (
        <>
            <div className={'p-settings__item' + getClassName(!mediaScreenL, 'u-mb15')}>
                <p className='p-settings__current'>current font : {font}</p>
                <button className={'p-settings__btn' + getClassName(disabled, 'is-disabled')} onClick={() => setIsShow(!disabled && true)}>change font</button>
            </div>
            {disabled && <div className='p-settings__error'>This feature is not available on {client || 'Your current OS'}.</div>}
            {isShow &&
                <div className={'c-modal' + getDark(isDark, 'is-dark')} ref={modalRef} tabIndex={0} onFocus={() => setIsOver(true)}
                    onBlur={() => {
                        setIsOver(false)
                        setIsShow(false)
                    }}>
                    <span onClick={() => {
                        setIsShow(false)
                        setIsOver(false)
                    }} className='c-modal__close'><img src={asset('/images/close.svg', isDark)} /></span>
                    <ul>
                        {
                            fonts.map((font, index) => <li className={'c-modal__option' + getDark(isDark, 'is-dark')} onClick={() => handleClick(font.style)} key={index}>{font.name}</li>)
                        }
                    </ul>
                </div>
            }
        </>
    )
}

export default FontFamily
