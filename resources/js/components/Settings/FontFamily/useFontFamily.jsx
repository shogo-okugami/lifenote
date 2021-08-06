import { useState, useEffect, useRef, useContext, useCallback } from 'react'
import { app } from '../../App/useApp'

const useFontFamily = (setIsOver) => {

    const { darked: { isDark }, font: { setFont }, mediaScreenL } = useContext(app)
    const [isShow, setIsShow] = useState(false)
    const modalRef = useRef(null)

    useEffect(() => {
        isShow && modalRef.current.focus()
    }, [isShow])

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

    const disabled = client === 'iOS' || client === 'Android' || client === null

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
        let font = 'System Font'
        if (!disabled) {
            if (localStorage.getItem('font')) {
                font = fonts.find(element => element.style === localStorage.getItem('font'))
                return font.name
            } else {
                return font
            }
        } else {
            return font
        }
    })()

    const handleClick = useCallback((font) => {
        localStorage.setItem('font', font)
        setFont(font)
        setIsShow(false)
        setIsOver(false)
    }, [])

    return { isDark, mediaScreenL, client, disabled, modalRef, font, isShow, setIsShow, fonts, handleClick }

}

export default useFontFamily
