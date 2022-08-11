import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { collection, orderBy, doc, query, onSnapshot, getDocs } from 'firebase/firestore'
import { usersCollection } from '../../firebase-client'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { setCurrentLists, currentListsState } from '../../store/slices/currentListsSlice'
import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import List from '../../components/List'

const GetListState = (props) => {
    // const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const title = useParams()
    const user = useSelector((state) => state.user.user)
    // const title = useParams()
    // const boards = useSelector(personalBoardsState)
    // const currentBoard = boards.find(ob => ob.title === title.id)
    // const lists = useSelector(currentListsState)
    
    // const display = cards.length === 0 ? false : cards[0].listId === props.list.id

    // useEffect(() => {
        
        // console.log(qCards)

        // getDocs(qCards)
        // .then ((querySnapshot) => {querySnapshot.forEach((doc) => (
        //     { ...doc.data(), id: doc.id, listId: props.list.id}))
        // .then (() => dispatch(setCurrentCards(querySnapshot)))}) 

        useEffect(() => {
            const getDocuments = async () => {
                        
                const docRef = doc(usersCollection, user.id, 'personalBoards', props.curBoardId)
                const listsCol = collection(docRef, 'lists')
                const listDoc = doc(listsCol, props.list.id)
                const cardsCol = collection(listDoc, 'cards')
                const qCards = query(cardsCol, orderBy('position', 'asc'))
          
                const querySnapshot = await getDocs(qCards);
                const qq = []
                querySnapshot.forEach((doc) => {
                    qq.push(doc.data())})
            
              dispatch(setCurrentCards(qq))
            }
          
            getDocuments()
          }, [props.list.id, props.curBoardId])
        
        
        

        // const p = onSnapshot(qCards, (snapshot) => {
        //     const cardSnap = snapshot.docs.map((doc) => (
        //         { ...doc.data(), id: doc.id, listId: props.list.id}))
        //     dispatch(setCurrentCards(cardSnap))
        // })
        // return p
    // }, [])

    // useMemo(() => {
    //     const docRef = doc(usersCollection, user.id, 'personalBoards', props.curBoardId)
    //     const listsCol = collection(docRef, 'lists')
    //     const listDoc = doc(listsCol, props.list.id)
    //     const cardsCol = collection(listDoc, 'cards')
    //     const qCards = query(cardsCol, orderBy('position', 'asc'))
    //     // console.log(qCards)

    //      onSnapshot(qCards, (snapshot) => {
    //         const cardSnap = snapshot.docs.map((doc) => (
    //             { ...doc.data(), id: doc.id, listId: props.list.id}))
    //         dispatch(setCurrentCards(cardSnap))
    //     })
    //     // return p
    // }, [props.list.id])
    const cards = useSelector(currentCardsState)
    console.log(cards)
    if (!!cards) {
        return <List list={props.list} curBoardId={props.curBoardId} cards={cards}/>
    } 
}

export default GetListState