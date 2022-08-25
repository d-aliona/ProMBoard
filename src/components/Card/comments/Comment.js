import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { db } from '../../../firebase-client'
import { collection, orderBy, doc, query, onSnapshot } from 'firebase/firestore'

import { avatarState } from '../../../store/slices/avatarSlice'
import { setCurrentComments, currentCommentsState } from '../../../store/slices/currentCommentsSlice'
import useOutsideClick from '../../../hooks/useOutsideClick'
import style from '../../../assets/scss/card.module.scss'
import styles from '../../../assets/scss/deleteListForm.module.scss'

const Comment = ({card, comment}) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.user)
    
    const avatar = useSelector(avatarState)
    const [clickEditComment, setClickEditComment] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [commentText, setCommentText] = useState('')

    const handleInputComment = (e) => {
        e.stopPropagation()
        setClickEditComment(true)
    }

    const cancel = (e) => {
        e.stopPropagation()
        setClickEditComment(false)
        setCommentText(comment.comment)
    }

    const editComment = (comment) => {

    }

    const deleteComment = () => {
        
    }
    
    return (
        <>
            <div  style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px'}}>
                <div className={style.circle}>?</div>
                <div style={{fontSize: '16px', fontWeight: '600'}}>{comment.user} </div>
                <div>{comment.time}</div>
            </div>
            <div>    
                <div>
                    {clickEditComment ? 
                        <>
                            <textarea 
                                type='text'
                                className={style.inputComment}
                                value={comment.comment}
                                autoFocus
                                onChange={(e) => setCommentText(e.target.value)}
                                >
                            </textarea>
                            <div style={{marginLeft: 'calc(35px + 10px)'}}>
                                <button className={style.buttonTrue} >
                                    Save
                                </button>
                                <button className={style.buttonCancel} onClick={cancel}>
                                    Cancel
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <pre>
                                <div className={style.commentText}>
                                    {comment.comment}
                                </div>
                            </pre>
                            {!confirmDelete && 
                                <div style={{textAlign:'end', paddingTop:'6px'}}>
                                    <span className={style.updateComment} onClick={() => setClickEditComment(true)}>Edit</span>
                                    <span className={style.updateComment} 
                                        onClick={(e) => {setConfirmDelete(true); e.stopPropagation()}}>Delete</span>
                                </div>}
                            {!!confirmDelete && 
                                <div className={style.confirmDelete}>
                                    Are you sure you want to delete this comment?
                                    <button className={styles.buttonYes} onClick={deleteComment}>
                                        Yes
                                    </button>
                                    <button className={styles.buttonNo} onClick={() => setConfirmDelete(false)}>
                                        No
                                    </button>
                                </div>
                            }
                        </>}
                </div>
            </div>    
        </>
         
    )
}

export default Comment