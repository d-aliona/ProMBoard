import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'

import { collection, getDocs, orderBy, doc, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { setCurrentComments, currentCommentsState } from '../../store/slices/currentCommentsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import AddCardForm from '../../features/AddCardForm'
import useOutsideClick from '../../hooks/useOutsideClick'
import CardTitle from './CardTitle'
import CardDescription from './CardDescription'
import CardCommentForm from './comments/CardCommentForm'
import CardComments from './comments/CardComments'
import CardSidebar from './CardSidebar'
import { Navigate } from "react-router-dom"
import style from '../../assets/scss/card.module.scss'


const Card = ({card, list}) => {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const title = useParams()
    
    const handleClickToOpenCard = (e) => {
        e.stopPropagation()
        navigate('/auth/board/' + title.id + '/' + card.id, {state: {list: list, card: card}})
    }

    return (
        <>
            <div className={style.cardWrapper} >
                <div className={style.cardTitle} onClick={handleClickToOpenCard}>
                    {card.cardTitle}
                    <div style={{display:'flex', gap:'10px'}}>
                        {card.description ? 
                            <abbr title="This card has a description">
                                <div className={style.descriptioniconMini}></div>
                            </abbr> 
                            : null }
                        {card.commentsExist ? 
                            <div style={{display:'flex', gap:'4px', alignItems:'end'}}>
                                <abbr title="This card has comments">
                                <div className={style.commenticonMini}></div>
                                </abbr> 
                                <div style={{color:'black'}}>{card.commentsNumber}</div>
                            </div>
                        : null }   
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card