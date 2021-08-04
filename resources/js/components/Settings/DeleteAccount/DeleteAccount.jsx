import React from 'react'
import { route, asset } from '../../../functions'
import useDeleteAccount from './useDeleteAccount'

const DeleteAccount = ({ setIsOver }) => {

    const { userId, isDark, csrf, mediaScreenL, isShow, setIsShow, modalRef, handleMouseDown } = useDeleteAccount()

    return (
        <>
            <button onClick={() => setIsShow(true)} className='c-btn--danger'>Delete your account</button>
            {isShow &&
                <div id="modal" className={'c-modal--delete' + (isDark ? ' is-dark' : '')} ref={modalRef} tabIndex={0} onFocus={() => setIsOver(true)}
                    onBlur={() => {
                        setIsOver(false)
                        setIsShow(false)
                    }}>
                    {mediaScreenL &&
                        <span onClick={() => {
                            setIsShow(false)
                            setIsOver(false)
                        }} className='c-modal__close'><img src={asset('/images/close.svg', isDark)} />
                        </span>}
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
