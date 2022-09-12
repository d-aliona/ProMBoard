import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { db } from '../../../firebase-client'
import { collection, orderBy, doc, query, onSnapshot } from 'firebase/firestore'

import Comment from './Comment'
import { setCurrentComments, currentCommentsState } from '../../../store/slices/currentCommentsSlice'
import useOutsideClick from '../../../hooks/useOutsideClick'
import style from '../../../assets/scss/card.module.scss'

const CardComments = ({card}) => {
    const dispatch = useDispatch()
    const comments = useSelector(currentCommentsState)
    
    useEffect(() => {
        
        const commentsCol = collection(db, 'cards', card.id, 'comments')
        const qComments = query(commentsCol, orderBy('time', "desc"))
        
        onSnapshot(qComments, (snapshot) => {
            const commentsSnap = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            dispatch(setCurrentComments(commentsSnap))
        })
    }, [card])
    
    return (
        <>
            <div style={{padding: '20px 0 20px 20px'}}>
                {comments &&
                    comments.map((comment) => {
                        return <Comment key={comment.id} card={card} comment={comment}/>
                    })}
            </div>
        </>
    )
}

export default CardComments