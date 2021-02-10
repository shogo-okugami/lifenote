import React, { useState } from 'react'

const inputTextArea = ({ errors ,text}) => {

    const [count, setCount] = useState(0)
    const [isOver, setIsOver] = useState(false)

    const handleKeyUp = (e) => {

        const value = e.target.value.replace(/\n/g, "")

        setCount(value.length)

        const newCount = value.length

        newCount > 500 ? setIsOver(true) : setIsOver(false)

    }

    return (
        <>
            <div className="c-form__item">
                <textarea onKeyUp={(e) => handleKeyUp(e)} name="text" className="c-form__textarea" rows="18" placeholder="Please write a dialry">
                    {text && text}
                </textarea>
                <div className="u-flex-between u-mt10px">
                    <div className="c-form__message">{errors.text}</div>
                    <span className={'c-form__textarea__counter ' + (isOver ? 'is-over' : '')}>{count}/500</span>
                </div>
            </div>
        </>
    )

}

export default inputTextArea
