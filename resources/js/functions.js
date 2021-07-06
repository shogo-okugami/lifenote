import React from 'react'
import { domain, routes } from './routes'

//改行コード変換関数
const nl2br = (text) => {
    let regex = /(\n)/g
    return text.split(regex).map((line, index) => {
        if (line.match(regex)) {
            return <br key={index} />
        }
        else {
            return line
        }
    }
    )
}

//オブジェクト型判定関数
const isObject = (value) => {
    return value !== null && typeof value === 'object'
}

//URL出力関数
const route = (name, params) => {
    //routesから値を取得
    let value = routes[name]
    //値がオブジェクトの場合にそのオブジェクトからパスを取得する
    value = isObject(value) ? value.path : value
    //paramsが配列で中に値を持つ場合
    if (Array.isArray(params) && params.length) {
        // paramsの値を各パラメータにセット
        params.map((param) => {
            value = value.replace(/\{.+\}/, String(param))
        })
    }
    //paramsがないがパスにデフォルトパラメータがある場合
    if (value.match(/\{.+\?\}/g)) {
        //value.paramsのデフォルト値を各パラメータにセット
        routes[name].params.map((param) => {
            value = routes[name].path.replace(/\{.+\}/, String(param))
        })
    }
    const result = domain + value
    return result
}

//ファイルパス出力関数
const asset = (value) => {
    return domain + value
}

const getTheme = ({theme, isDark, isLogin = true, ignored = false}) => {
    if (isLogin) {
        //themeがnullではない、またはlightではない場合
        if (theme !== 'light' || theme !== null) {
            //ダークモード時にもスタイルを適用する場合
            if (ignored) {
                return theme !== 'light' ? ` is-${theme}` : ''
                //ダークモード時はスタイルを適用しない場合
            } else {
                return !isDark ? theme !== 'light' ? ` is-${theme}` : '' : ''
            }
        } else {
            return ''
        }
    } else {
        return ''
    }
}

export { nl2br, route, asset, getTheme }
