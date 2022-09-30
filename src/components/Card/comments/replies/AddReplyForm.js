import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { db } from '../../../../firebase-client'
import { collection, addDoc } from 'firebase/firestore'

import style from '../../../../assets/scss/card.module.scss'

const AddReplyForm = ({card, comment, setClickReplyComment}) => {
    const user = useSelector((state) => state.user.user)
    const [replyText, setReplyText] = useState('')

    const saveReply = () => {
        const colRef = collection(db, 'cards', card.id, 'replies')
        
        addDoc(colRef, {
            reply: replyText,
            userID: user.id,
            time: new Date().toLocaleString('en-GB'),
            commentID: comment.id,
        })
        .then(() => {
            setClickReplyComment(false)
            setReplyText('')
        })
        .catch((error) => {
            console.error(error.message)
        })
    }
    
    return (
        <>
            <textarea 
                className={style.editComment}
                autoFocus
                onChange={(e) => setReplyText(e.target.value)}
                >
            </textarea>
            <div style={{marginLeft: 'calc(35px + 10px)'}}>
                <button className={style.buttonTrue} onClick={saveReply}>
                    Save
                </button>
                <button className={style.buttonCancel} 
                    onClick={(e) => {e.stopPropagation(); setClickReplyComment(false); setReplyText('')}}>
                    Cancel
                </button>
            </div>
        </>
    )
}

export default AddReplyForm