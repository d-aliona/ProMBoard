import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { collection, orderBy, doc, query, onSnapshot, where } from 'firebase/firestore'
import { onIdTokenChanged } from 'firebase/auth'
import { db, auth, usersCollection } from '../../firebase-client'

import { setUser } from '../../store/slices/userSlice'
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