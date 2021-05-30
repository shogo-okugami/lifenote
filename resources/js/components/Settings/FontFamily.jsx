import React, { useState, useEffect, useRef, useContext } from 'react'
import { asset } from '../../functions'
import { AppSettings } from '../App'

const FontFamily = ({ setIsOver }) => {

    const client = (() => {
        const os = window.navigator.userAgent.toLowerCase();
        if (os.indexOf("windows nt") !== -1) {
            return 'windows'
        } else if (os.indexOf("android") !== -1) {
            return 'Android'
        } else if (os.indexOf("iphone") !== -1 || os.indexOf("ipad") !== -1) {
            return 'iOS'
        } else if (os.indexOf("mac os x") !== -1) {
            return 'macOS'
        } else {
            return null
        }
    })()

    const fonts = (() => {
        switch (client) {
            case 'windows':
                return [
                    {
                        name: 'System Font',
                        style: '',
                    },
                    {
                        name: 'Meiryo',
                        style: `'メイリオ', Meiryo,sans-serif`,
                    },
                    {
                        name: 'Meiryo UI',
                        style: `'Meiryo UI',sans-serif`,
                    },
                    {
                        name: 'Yu Gothic',
                        style: `YuGothic,'Yu Gothic',sans-serif`,
                    },
                    {
                        name: 'Yu Mincho',
                        style: `'Yu Mincho Light','YuMincho','Yu Mincho','游明朝体',sans-serif`,
                    },
                    {
                        name: 'Yu Gothic UI',
                        style: `'Yu Gothic UI',sans-serif`,
                    },
                    {
                        name: 'MS Gothic',
                        style: `'ＭＳ ゴシック',sans-serif`,
                    },
                    {
                        name: 'MS PGothic',
                        style: `'ＭＳ Ｐゴシック','MS PGothic',sans-serif`,
                    },
                    {
                        name: 'MS UI Gothic',
                        style: `'MS UI Gothic',sans-serif`,
                    },
                    {
                        name: 'MS Mincho',
                        style: `'ＭＳ 明朝', 'MS Mincho',sans-serif`,
                    },
                    {
                        name: 'MS PMincho',
                        style: `'ＭＳ Ｐ明朝','MS PMincho',sans-serif`,
                    },
                ]
            case 'macOS':
                return [
                    {
                        name: 'System Font',
                        style: '',
                    },
                    {
                        name: 'Hiragino Kaku Gothic Pro N',
                        style: `'Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3',sans-serif`,
                    },
                    {
                        name: 'Hiragino Mincho Pro N',
                        style: `'ヒラギノ明朝 ProN','Hiragino Mincho ProN',sans-serif`,
                    },
                    {
                        name: 'klee',
                        style: `'klee',sans-serif`,
                    },
                    {
                        name: 'Tsukushi A Maru Gothic',
                        style: `'TsukuARdGothic-Regular',sans-serif`,
                    },
                    {
                        name: 'Yu Gothic',
                        style: `YuGothic,'Yu Gothic',sans-serif`,
                    },
                    {
                        name: 'Yu Mincho',
                        style: `'Yu Mincho Light','YuMincho','Yu Mincho','游明朝体',sans-serif`,
                    },
                    {
                        name: 'Hannotate SC',
                        style: `'Hannotate SC',sans-serif`,
                    },
                    {
                        name: 'HanziPen SC',
                        style: `'HanziPen SC',sans-serif`,
                    },
                    {
                        name: 'Wawati SC',
                        style: `'Wawati SC',sans-serif`,
                    },
                    {
                        name: 'Kaiti SC',
                        style: `'Kaiti SC',sans-serif`,
                    },
                ]
            default:
                return null
        }
    })()

    let font = (() => {
        if (localStorage.getItem('font')) {
            const font = fonts.find(element => element.style === localStorage.getItem('font'))
            return font.name
        } else {
            return 'System Font'
        }
    })()


    const setFont = useContext(AppSettings).font.setFont

    const disabled = client === 'iOS' || client === 'Android'

    const [isShow, setIsShow] = useState(false)

    const modalRef = useRef(null)

    const handleClick = (font) => {
        localStorage.setItem('font', font)
        setFont(font)
        setIsShow(false)
        setIsOver(false)
    }

    useEffect(() => {
        isShow && modalRef.current.focus()
    }, [isShow])

    const isDark = useContext(AppSettings).darked.isDark

    return (
        <>
            <div className='p-settings__item'>
                <p>current font : {font}</p>
                <button className='p-settings__btn' onClick={() => setIsShow(client !== 'iOS' || client !== 'Android' && true)}>change font</button>
            </div>
            {disabled && <div>This feature is not available on {client || 'Your current OS'}.</div>}
            {isShow &&
                <div className={'c-modal' + (isDark ? ' is-dark' : '')} ref={modalRef} tabIndex={0} onFocus={() => setIsOver(true)}
                    onBlur={() => {
                        setIsOver(false)
                        setIsShow(false)
                    }}>
                    <span onClick={() => {
                        setIsShow(false)
                        setIsOver(false)
                    }} className='c-modal__close'><img src={asset(`/images/close${isDark ? '--darked' : ''}.svg`)} /></span>
                    <ul>
                        {
                            fonts.map((font, index) => <li className={'c-modal__option' + (isDark ? ' is-dark' : '')} onClick={() => handleClick(font.style)} key={index}>{font.name}</li>)
                        }
                    </ul>
                </div>
            }
        </>
    )
}

export default FontFamily
