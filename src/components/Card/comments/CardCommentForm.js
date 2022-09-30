import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { updateDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase-client'

import Initials from '../../../ui/Initials'
import useOutsideClick from '../../../hooks/useOutsideClick'
import style from '../../../assets/scss/card.module.scss'
// import { Navigate, useNavigate } from 'react-router-dom'

const CardCommentForm = ({card}) => {
    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate()    
    const [clickComment, setClickComment] = useState(false)
    const [comment, setComment] = useState('')
    
    const addCardComment = async() => {
        const colRef = collection(db, 'cards', card.id, 'comments')
        
        addDoc(colRef, {
            comment: comment,
            userID: user.id,
            time: new Date().toLocaleString('en-GB'),
            edited: false,
        })
        .then(() => {
            setClickComment(false)
            setComment('')
        })
        .catch((error) => {
            console.error(error.message)
        })

        const docRef = doc(db, 'cards', card.id)

        await updateDoc(docRef, {
            commentsExist: true,
            commentsNumber: card.commentsNumber + 1,
        })
        navigate('/auth/board/' + card.boardID + '/' + card.id)
    }

    const handleInputComment = (e) => {
        e.stopPropagation()
        setClickComment(true)
    }

    const cancel = (e) => {
        e.stopPropagation()
        setClickComment(false)
        setComment('')
    }
    
    return (
        <>
            <div style={{padding: '20px 0 20px 20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div className={style.commenticon}></div>
                    <div style={{fontSize: '18px'}}>Comments</div>
                </div>
                <div style={{display: 'flex', alignItems: 'start', gap: '10px', marginTop: '10px'}}>
                    <Initials user={user}/>
                    <div className={!clickComment ? style.commentForm : null} 
                        onClick={handleInputComment}>
                        {clickComment ? 
                            <>
                                <textarea 
                                    type='text'
                                    className={style.inputComment}
                                    placeholder='Write a comment...'
                                    autoFocus
                                    onChange={(e) => setComment(e.target.value)}
                                    >
                                </textarea>
                                <div>
                                    <button 
                                        className={style.buttonTrue} 
                                        disabled={!Boolean(comment)} 
                                        onClick={addCardComment}>
                                        Save
                                    </button>
                                    <button className={style.buttonCancel} onClick={cancel}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                            :   <div>
                                    Write a comment...
                                </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardCommentForm