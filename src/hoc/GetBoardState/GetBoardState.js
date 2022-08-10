import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { collection, orderBy, doc, query, onSnapshot } from 'firebase/firestore'
import { usersCollection } from '../../firebase-client'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { setCurrentLists, currentListsState } from '../../store/slices/currentListsSlice'

const GetBoardState = ({ children }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const title = useParams()
    const boards = useSelector(personalBoardsState)
    const currentBoard = boards.find(ob => ob.title === title.id)
    const lists = useSelector(currentListsState)
    
    useEffect(() => {
        const docRef = doc(usersCollection, user.id, 'personalBoards', currentBoard.id)
        const listsCol = collection(docRef, 'lists')
        const qLists = query(listsCol, orderBy('order', 'asc'))
        
        onSnapshot(qLists, (snapshot) => {
            const listSnap = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            dispatch(setCurrentLists(listSnap))
        })
    }, [title, currentBoard])
    
    if (!!lists) {
        return children
      } 
}

export default GetBoardState