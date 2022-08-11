import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { collection, orderBy, doc, query, onSnapshot } from 'firebase/firestore'
import { usersCollection } from '../../firebase-client'

import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import AddCardForm from '../../features/AddCardForm'
import style from '../../assets/scss/card.module.scss'


const Card = ({card}) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    // const cards = useSelector(currentCardsState)
    console.log(card)

    return (
        <>
            <div className={style.cardWrapper}>
                <div className={style.cardTitle}>
                    {card.cardTitle}
                </div>
            </div>
        </>
    )
}

export default Card