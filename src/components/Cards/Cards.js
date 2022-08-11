import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { collection, orderBy, doc, query, onSnapshot } from 'firebase/firestore'
import { usersCollection } from '../../firebase-client'

import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import AddCardForm from '../../features/AddCardForm'
import Card from '../Card'
import style from '../../assets/scss/card.module.scss'


const Cards = ({list}) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const cards = useSelector(currentCardsState)
    console.log(cards)
    // const display = cards.length === 0 ? false : cards[0].listId === list.id

    // const display = cards[0].listId === list.id
    // const display = cards.length != 0 && cards[0].listId === list.id
    return (
        cards && 
            cards.map((card, key) => {
                return (
                <div >
                    <Card key={key} card={card}/>
                </div>
                )
            })
    )
}

export default Cards