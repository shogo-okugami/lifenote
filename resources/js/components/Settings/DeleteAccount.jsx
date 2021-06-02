import React, { useState, useRef, useEffect, useContext } from 'react'
import { route, asset } from '../../functions'
import { AppSettings } from '../App'

const DeleteAccount = ({ userId, setIsOver }) => {

    const csrf = useContext(AppSettings).csrf
    const [isShow, setIsShow] = useState(false)
    const modalRef = useRef(false)
    useEffect(() => {
        isShow && modalRef.current.focus()
    }, [isShow])

    const handleMouseDown = () => {
        const form = document.getElementById('delete-form')
        form.submit();
    }

    return (
        <>
            <button onClick={() => setIsShow(true)} className='c-btn--danger'>Delete your account</button>
            {isShow &&
                <div className='c-modal--delete' ref={modalRef} tabIndex={0} onFocus={() => setIsOver(true)}
                    onBlur={() => {
                        setIsOver(false)
                        setIsShow(false)
                    }}>
                    <span onClick={() => {
                        setIsShow(false)
                        setIsOver(false)
                    }} className='c-modal__close'><img src={asset('/images/close.svg')} /></span>
                    <p>Delete your account and all of your notes.<br />
                       Are you really sure to want to do it ?
                    </p>
                    <form id='delete-form' action={route('delete', [userId])} method='POST'>
                        <input type='hidden' name='_token' value={csrf} />
                        <button onMouseDown={() => handleMouseDown()} type='submit' className='c-btn--danger'>Delete</button>
                        <button className='c-btn--secondary'>Cancel</button>
                    </form>
                </div>
            }
        </>
    )
}

export default DeleteAccount
