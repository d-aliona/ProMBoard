import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { collection, orderBy, doc, query, onSnapshot, where } from 'firebase/firestore'
import { onIdTokenChanged } from 'firebase/auth'
import { db, auth, usersCollection } from '../../firebase-client'

import { setUser } from '../../store/slices/userSlice'
import { setUsers } from '../../store/slices/usersSlice'
import { setAllBoards } from '../../store/slices/allBoardsSlice'
import { setPersonalBoards } from '../../store/slices/personalBoardsSlice'
import { setNotPersonalBoards } from '../../store/slices/notPersonalBoardsSlice'

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
  }, [])
      
  useEffect(() => {
    if (user.id) {
      const colRef = collection(db, 'boards')
      const qAllBoards = query(colRef)
      
      onSnapshot(qAllBoards, (snapshot) => {
        const allBoardsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        dispatch(setAllBoards(allBoardsSnap))
      })

      const qPersBoards = query(colRef, where('owner', "==", user.id))
      
      onSnapshot(qPersBoards, (snapshot) => {
        const persBoardsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        dispatch(setPersonalBoards(persBoardsSnap))
      })
      const qNotPersBoards = query(colRef, where('owner', "!=", user.id))
      
      onSnapshot(qNotPersBoards, (snapshot) => {
        const notPersBoardsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        dispatch(setNotPersonalBoards(notPersBoardsSnap))
      })
    }
    
  }, [user])

  useEffect(() => {
    const listsCol = collection(db, 'users')
        
    onSnapshot(listsCol, (snapshot) => {
        const listSnap = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        })
        dispatch(setUsers(listSnap))
    })
  }, [user])

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