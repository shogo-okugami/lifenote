import React from 'react'

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

export { nl2br }
