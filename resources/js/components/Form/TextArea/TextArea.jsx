import React from 'react'
import { getClassName } from '../../../functions'
import useTextArea from './useTextArea'

const TextArea = ({ errors, text }) => {

    const { mediaScreenL, count, isOver, handleKeyUp } = useTextArea()

    return (
            <div className="c-form__item">
                <textarea onKeyUp={(e) => handleKeyUp(e)} name="text" className="c-form__textarea" rows="18" placeholder="Please write a dialry">
                    {text && text}
                </textarea>
                {mediaScreenL && <div className="u-flex-between u-mt10px">
                    <div className="c-form__message">{errors.text}</div>
                    <span className={'c-form__textarea__counter ' + getClassName(isOver, 'is-over')}>{count}/500</span>
                </div>}
            </div>
    )
}

export default TextArea
