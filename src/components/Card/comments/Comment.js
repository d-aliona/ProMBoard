import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { db } from '../../../firebase-client'
import { collection, orderBy, doc, deleteDoc, updateDoc, query, onSnapshot } from 'firebase/firestore'

import { setCurrentComments, currentCommentsState } from '../../../store/slices/currentCommentsSlice'
import useOutsideClick from '../../../hooks/useOutsideClick'
import style from '../../../assets/scss/card.module.scss'
import styles from '../../../assets/scss/deleteForm.module.scss'

const Comment = ({card, comment}) => {
    const user = useSelector((state) => state.user.user)
    const [clickEditComment, setClickEditComment] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [commentText, setCommentText] = useState(comment.comment)

    const handleInputComment = (e) => {
        e.stopPropagation()
        setClickEditComment(true)
    }

    const cancel = (e) => {
        e.stopPropagation()
        setClickEditComment(false)
        setCommentText(comment.comment)
    }

    const editComment = async(e) => {
        const docRef = doc(db, 'cards', card.id, 'comments', comment.id)
                
        await updateDoc(docRef, {
            comment: commentText,
            edited: true,
        })
        setClickEditComment(false)
    }

    const deleteComment = async(e) => {
        e.stopPropagation()
        setConfirmDelete(false)
        await deleteDoc(doc(db, "cards", card.id, 'comments', comment.id))

        const docRef = doc(db, 'cards', card.id)
        await updateDoc(docRef, {
            commentsExist: card.commentsNumber === 1 ? false : true,
            commentsNumber: card.commentsNumber - 1,
        })
    }
    
    return (
        <>
            <div  style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px'}}>
                <div className={style.circle}>{user.firstName[0] + user.lastName[0]}</div>
                <div style={{fontSize: '16px', fontWeight: '600'}}>{comment.user} </div>
                <div>{comment.time}</div>
                <div>{comment.edited ? '(edited)' : null}</div>
            </div>
            <div>    
                <div>
                    {clickEditComment ? 
                        <>
                            <textarea 
                                className={style.editComment}
                                value={commentText}
                                autoFocus
                                onChange={(e) => setCommentText(e.target.value)}
                                >
                            </textarea>
                            <div style={{marginLeft: 'calc(35px + 10px)'}}>
                                <button className={style.buttonTrue} onClick={editComment}>
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
                                    <span className={style.updateComment} 
                                        onClick={(e) => {setClickEditComment(true); e.stopPropagation()}}>
                                        Edit
                                    </span>
                                    <span className={style.updateComment} 
                                        onClick={(e) => {setConfirmDelete(true); e.stopPropagation()}}>
                                        Delete
                                    </span>
                                </div>}
                            {confirmDelete && 
                                <div className={style.confirmDelete}>
                                    Are you sure you want to delete this comment?
                                    <button className={styles.buttonYes} 
                                        style={{fontSize:'16px'}}
                                        onClick={deleteComment}>
                                        Yes
                                    </button>
                                    <button className={styles.buttonNo}
                                        style={{fontSize:'16px'}} 
                                        onClick={(e) => {setConfirmDelete(false); e.stopPropagation()}}>
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