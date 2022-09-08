import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { collection, where, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../../firebase-client'
import { allBoardsState } from '../../store/slices/allBoardsSlice'
import { setCurrentLists, currentListsState } from '../../store/slices/currentListsSlice'
import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'

const GetBoardState = ({ children }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const title = useParams()
    const allBoards = useSelector(allBoardsState)
    const lists = useSelector(currentListsState)
    const cards = useSelector(currentCardsState)
    const currentBoard = allBoards.find(ob => ob.id === title?.id)
    
    useEffect(() => {
        const listsCol = collection(db, 'lists')
        const qLists = query(listsCol, where('boardID', '==', currentBoard?.id), orderBy('position'))
        
        onSnapshot(qLists, (snapshot) => {
            const listSnap = snapshot?.docs.map((doc) => {
                return { ...doc?.data(), id: doc?.id }
            })
            dispatch(setCurrentLists(listSnap))
        })
    }, [title, currentBoard, user])

    useEffect(() => {
        const cardsCol = collection(db, 'cards')
        const qCards = query(cardsCol, where('boardID', '==', currentBoard.id))
        
        onSnapshot(qCards, (snapshot) => {
            const cardSnap = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            dispatch(setCurrentCards(cardSnap))
        })
    }, [title, currentBoard])
    
    if (!!lists && !!cards) {
       return children
    } 
}

export default GetBoardState