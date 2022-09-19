import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { collection, orderBy, query, onSnapshot, where } from 'firebase/firestore'
import { onIdTokenChanged } from 'firebase/auth'
import { db, auth } from '../../firebase-client'

import { setUser } from '../../store/slices/userSlice'
import { setUsers } from '../../store/slices/usersSlice'
import { setAllBoards } from '../../store/slices/allBoardsSlice'
import { setAllLists } from '../../store/slices/allListsSlice'
import { setAllCards } from '../../store/slices/allCardsSlice'
import { setPersonalBoards } from '../../store/slices/personalBoardsSlice'
import { setNotPersonalBoards } from '../../store/slices/notPersonalBoardsSlice'
import { setNotifications } from '../../store/slices/notificationsSlice'

const GetState = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  
  useEffect(() => {
    onIdTokenChanged(auth, (user) => {
      if (!user) {
        console.log('No User found...')
      } else {
        const token = user.getIdToken().then(() => {
          const q = query(collection(db, 'users'), where('email', '==', user.email))
          onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
              dispatch(
                setUser({
                  id: doc.id,
                  ...doc.data(),
                })
              )
            })
          })
        })
      }
    })
  }, [dispatch])
      
  useEffect(() => {
    if (user.id) {
      const colRef = collection(db, 'boards')
      const qAllBoards = query(colRef)
      
      onSnapshot(qAllBoards, (snapshot) => {
        const allBoardsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        dispatch(setAllBoards(allBoardsSnap))
      })

      const qPersBoards = query(colRef, where('owner', "==", user.id), where('statusOpened', '==', true))
      
      onSnapshot(qPersBoards, (snapshot) => {
        const persBoardsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        dispatch(setPersonalBoards(persBoardsSnap))
      })

      const qNotPersBoards = query(colRef, where('owner', "!=", user.id), where('statusOpened', '==', true))
      
      onSnapshot(qNotPersBoards, (snapshot) => {
        const notPersBoardsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        dispatch(setNotPersonalBoards(notPersBoardsSnap))
      })
    }
    
  }, [user, dispatch])

  useEffect(() => {
    const listsCol = collection(db, 'users')
        
    onSnapshot(listsCol, (snapshot) => {
        const listSnap = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        })
        dispatch(setUsers(listSnap))
    })
  }, [user, dispatch])

  useEffect(() => {
    const listsCol = collection(db, 'lists')
        
    onSnapshot(listsCol, (snapshot) => {
        const listSnap = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        })
        dispatch(setAllLists(listSnap))
    })
  }, [user, dispatch])

  useEffect(() => {
    const listsCol = collection(db, 'cards')
        
    onSnapshot(listsCol, (snapshot) => {
        const listSnap = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        })
        dispatch(setAllCards(listSnap))
    })
  }, [user, dispatch])

  useEffect(() => {
    const notificationsCol = collection(db, 'users', user.id, 'notifications')
    const qNotifications = query(notificationsCol, orderBy('time', "desc"))
    
    onSnapshot(qNotifications, (snapshot) => {
        const notificationsSnap = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        })
        dispatch(setNotifications(notificationsSnap))
    })
  }, [user, dispatch])

  // useEffect(() => {
  //   if (user.id) {
  //     const colRef = collection(db, 'boards')
  //     const qNotPersBoards = query(colRef, where('owner', "!=", user.id))
      
  //     onSnapshot(qNotPersBoards, (snapshot) => {
  //       const notPersBoardsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //       dispatch(setNotPersonalBoards(notPersBoardsSnap))
  //     })
  //   }
    
  // }, [user])

  return children
}

export default GetState