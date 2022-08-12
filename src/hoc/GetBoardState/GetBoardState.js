import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { collection, orderBy, where, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase-client'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { setCurrentLists, currentListsState } from '../../store/slices/currentListsSlice'
import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'

const GetBoardState = ({ children }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const title = useParams()
    const boards = useSelector(personalBoardsState)
    const currentBoard = boards.find(ob => ob.boardTitle === title.id && ob.owner === user.id)
    const lists = useSelector(currentListsState)
    const cards = useSelector(currentCardsState)

    // console.log(currentBoard.id)
    useEffect(() => {
        
        const listsCol = collection(db, 'lists')
        const qLists = query(listsCol, where('boardID', '==', currentBoard.id))
        
        onSnapshot(qLists, (snapshot) => {
            const listSnap = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            dispatch(setCurrentLists(listSnap))
        })
    }, [title, currentBoard])

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
    
    if (lists && cards) {
        return children
      } 
}

export default GetBoardState