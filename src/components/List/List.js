import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { collection, orderBy, doc, query, onSnapshot } from 'firebase/firestore'
import { usersCollection } from '../../firebase-client'

import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import Cards from '../Cards'
import AddCardForm from '../../features/AddCardForm'
import style from '../../assets/scss/list.module.scss'


const List = ({list, curBoardId}) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const cards = useSelector(currentCardsState)

    return (
        <>
            <div className={style.listWrapper}>
                <div className={style.listTitle}>
                    {list.listTitle}
                    {cards && <Cards /> }
                </div>
                <AddCardForm list={list} curBoardId={curBoardId}/>
            </div>
        </>
    )
}

export default List