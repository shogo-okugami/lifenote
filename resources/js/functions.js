import React from 'react'

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

export { nl2br }
