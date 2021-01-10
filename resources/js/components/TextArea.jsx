import React, { useState } from 'react'

const inputTextArea = ({ errors }) => {

    const [count, setCount] = useState(0)
    const [isOver, setIsOver] = useState(false)

    console.log('render')

    const handleKeyUp = (e) => {

        const value = e.target.value.replace(/\n/g, "")

        setCount(value.length)

        const newCount = value.length

        console.log(newCount)

        if ( newCount > 500) {
            setIsOver(true)
        } else {
            setIsOver(false)
        }

    }

    return (
        <>
            <div className="c-form__item">
                <textarea onKeyUp={(e) => handleKeyUp(e)} name="text" className="c-form__textarea" rows="18" placeholder="Please write a dialry"></textarea>
                <div className="u-flex-between u-mt10px">
                    <div className="c-form__message">{errors.text}</div>
                    <span className={'c-form__textarea__counter ' + (isOver ? 'is-over' : '')}>{count}/500</span>
                </div>
            </div>
        </>
    )

}

export default inputTextArea
