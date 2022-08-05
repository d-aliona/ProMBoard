import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { collection, orderBy, query, onSnapshot, where } from 'firebase/firestore'
import { onIdTokenChanged } from 'firebase/auth'
import { db, auth, usersCollection } from '../../firebase-client'

import { setUser } from '../../store/slices/userSlice'
import { setPersonalBoards } from '../../store/slices/personalBoardsSlice'
// import { setMembers } from 'store/slices/membersSlice'
// import { useLocation } from 'react-router-dom'
// import { setSelected } from 'store/slices/selectSlice'
// import { setInput } from 'store/slices/filterSlice'

const GetState = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
//   const location = useLocation()

//   useEffect(() => {
//     dispatch(setSelected('All'))
//   }, [location])

//   useEffect(() => {
//     dispatch(setInput(''))
//   }, [location])

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

  // citiesRef = collection(db, "cities")
  const PersonalBoards = collection(usersCollection, user.id, 'personalBoards')

  useEffect(() => {
    onSnapshot(PersonalBoards, (snapshot) => {
      const persBoardsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch(setPersonalBoards(persBoardsSnap))
    })
  }, [])

//   useEffect(() => {
//     onSnapshot(membersCollection, (snapshot) => {
//       const memberSnap = snapshot.docs.map((doc) => {
//         return { ...doc.data(), id: doc.id }
//       })
//       dispatch(setMembers(memberSnap))
//     })
//   }, [])

  return children
}

export default GetState