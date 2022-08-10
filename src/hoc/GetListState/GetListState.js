import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { collection, orderBy, doc, query, onSnapshot } from 'firebase/firestore'
import { usersCollection } from '../../firebase-client'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { setCurrentLists, currentListsState } from '../../store/slices/currentListsSlice'
import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'

const GetListState = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    // const title = useParams()
    // const boards = useSelector(personalBoardsState)
    // const currentBoard = boards.find(ob => ob.title === title.id)
    // const lists = useSelector(currentListsState)
    const cards = useSelector(currentCardsState)

    useEffect(() => {
        const docRef = doc(usersCollection, user.id, 'personalBoards', props.curBoardId)
        const listsCol = collection(docRef, 'lists')
        const listDoc = doc(listsCol, props.list.id)
        const cardsCol = collection(listDoc, 'cards')
        const qCards = query(cardsCol, orderBy('position', 'asc'))
        
        onSnapshot(qCards, (snapshot) => {
            const cardSnap = snapshot.docs.map((doc) => (
                { ...doc.data(), id: doc.id }))
            dispatch(setCurrentCards(cardSnap))
            setIsLoading(false)
        })
    }, [props.list.id, props.curBoardId])
    // console.log(cards)
    
    if (!!cards) {
        return props.children
    } 
}

export default GetListState