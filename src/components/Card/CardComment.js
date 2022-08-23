import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { avatarState } from '../../store/slices/avatarSlice'
import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/card.module.scss'

const CardComment = ({card}) => {
    const user = useSelector((state) => state.user.user)
    const avatar = useSelector(avatarState)
    
    const [clickComment, setClickComment] = useState(false)
    const [comment, setComment] = useState('')

    const updateCardComment = async (e) => {
        const docRef = doc(db, 'cards', card.id)
                
        await updateDoc(docRef, {
            // description: refInput.current.value,
        })
        // setClickDescription(false)
        // refInput.current = null
    }

    // const refInput = useOutsideClick(updateCardComment)

    const handleInputComment = (e) => {
        e.stopPropagation()
        setClickComment(true)
        // refInput.current.style.border = '2px solid rgba(23, 43, 77, .7)'
    }

    const cancel = (e) => {
        e.stopPropagation()
        setClickComment(false)
    }
    
    return (
        <>
            <div style={{padding: '20px 0 20px 20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div className={style.commenticon}></div>
                    <div style={{fontSize: '18px'}}>Comments</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div className={style.circle}>?</div>
                    <div className={style.CommentText} onClick={handleInputComment}>
                    {clickComment ? 
                        <>
                            <textarea 
                                // ref={refInput}
                                type='text'
                                className={style.inputComment}
                                placeholder='Write a comment...'
                                autoFocus
                                onChange={(e) => setComment(e.target.value)}
                                >
                            </textarea>
                            <div>
                                <button className={style.buttonTrue} >
                                    Save
                                </button>
                                <button className={style.buttonCancel} onClick={cancel}>
                                    Cancel
                                </button>
                            </div>
                        </>
                        :   <div style={{height: '35px'}}>
                                Write a comment...
                            </div>}
                    </div>
                </div>
                
                
            </div>
        </>
    )
}

export default CardComment