import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { collection, orderBy, where, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import Cards from '../Cards'
import AddCardForm from '../../features/AddCardForm'
import style from '../../assets/scss/list.module.scss'


const List = ({ list, curBoardId }) => {
    const dispatch = useDispatch()
    // const user = useSelector((state) => state.user.user)
    // const cards = useSelector(currentCardsState)

    useEffect(() => {
        // const docRef = doc(usersCollection, user.id, 'personalBoards', curBoardId)
        // const listsCol = collection(docRef, 'lists')
        // const listDoc = doc(listsCol, list.id)
        const cardsCol = collection(db, 'cards')
        const qCards = query(cardsCol, where('listID', '==', list.id))

        onSnapshot(qCards, (snapshot) => {
            const cardSnap = snapshot.docs.map((doc) => (
                { ...doc.data(), id: doc.id }))
            dispatch(setCurrentCards(cardSnap))
        })
        
    }, [list])

    // const display = cards.length === 0 ? false : cards[0].listId === list.id
    
    // console.log(cards)
    // console.log(display)
    // console.log(list.id)

    return (
        <>
            <div className={style.listWrapper}>
                <div className={style.listTitle}>
                    {list.listTitle}
                    {<Cards list={list}  />}
                </div>
                <AddCardForm list={list} curBoardId={curBoardId} />
            </div>
        </>
    )
}

export default List