import React, { useState, useEffect, useRef } from 'react'

const FontSetting = ({ isDark, setFont, setIsOver }) => {

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

    return (
        <div className={'p-settings__group--font'}>
            <h2 className={isDark ? ' is-dark' : ''}>Font</h2>
            <div className='p-settings__item'>
                <p>current font</p>
                <button className='p-settings__btn' onClick={() => setIsShow(client !== 'iOS' || client !== 'Android' && true)}>select theme</button>
            </div>
            {client === 'Android' || client === 'iOS' && <div>This feature is not available on {client}.</div>}
            {isShow &&
                <div className='c-modal' ref={modalRef} tabIndex={0} onFocus={() => setIsOver(true)}
                    onBlur={() => {
                        setIsOver(false)
                        setIsShow(false)
                    }}>
                    <ul>
                        {
                            fonts.map((font, index) => <li className={'c-modal__option'} onClick={() => handleClick(font.style)} key={index}>{font.name}</li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default FontSetting
