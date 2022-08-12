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


const Cards = ({list, curBoardId}) => {
    // const dispatch = useDispatch()
    // const user = useSelector((state) => state.user.user)
    const cards = useSelector(currentCardsState)
    const selectedCards = cards
        .filter((card) => card.listID === list.id)
        .sort((a,b) => a.position - b.position)
    
    // console.log(selectedCards)
    return (
        selectedCards && 
            selectedCards.map((card, key) => {
                return (
                    // <div>
                        <Card key={key} card={card} />
                    // </div>
                )
            })
    )
}

export default Cards