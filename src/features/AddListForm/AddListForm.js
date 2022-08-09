import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, orderBy, doc, query, onSnapshot, where } from 'firebase/firestore'
import { db, usersCollection } from '../../firebase-client'

import { currentListsState } from '../../store/slices/currentListsSlice'
import style from '../../assets/scss/addListForm.module.scss'

const AddListForm = (props) => {
    const title = props.title
    const curBoardId = props.curBoardId
    // const ref = useRef()
    const lists = useSelector(currentListsState)
    const user = useSelector((state) => state.user.user)
    const [clickAddList, setClickAddList] = useState(false)
    const [listTitle, setListTitle] = useState('')
    // let navigate = useNavigate()
    console.log(lists)

    const addList = async (e) => {
      e.preventDefault()
      const docRef = doc(usersCollection, user.id, 'personalBoards', curBoardId)
      const listsCol = collection(docRef, 'lists')
      
      await addDoc(listsCol, {
        listTitle: listTitle,
        order: lists.length ? lists.length + 1 : 1 
      }).catch((err) => {
        console.error(err)
      })

      setListTitle('')
      setClickAddList(false)
    }

    // const createEvent = async (e) => {
    //   e.preventDefault()
    //   setError('')
  
    //   const createdDocRef = await addDoc(eventsCollection, {
    //     eventName: eventName,
    //     eventDate: eventDate,
    //     score: parseInt(score),
    //   }).catch((err) => {
    //     setError(err.message)
    //     console.error(error)
    //   })
    //   const docRef = doc(db, 'events', createdDocRef.id)
    //   const colRef = collection(docRef, 'participants')
  
    //   members &&
    //     members.map(
    //       async (member, id) =>
    //         await setDoc(doc(colRef, member.id), {
    //           addPoints: 0,
    //           comment: '',
    //           visitedEvent: false,
    //         })
    //     )
  
    //   setEventName('')
    //   setEventDate('')
    //   setScore('')
    // }

    const cancel = () => {
      setClickAddList(false)
      setListTitle('')
    }

  return (
    <>
      {clickAddList && 
        <div className={style.addForm}>
          <input 
            className={style.inputTitle}
            type='text'
            placeholder='Enter list title'
            value={listTitle}
            onChange={(e) => {
                setListTitle(e.target.value)
            }}
            autoFocus
          />
          <div className={style.actions}>
            <span className={style.action} onClick={addList}>+</span>
            <span className={style.action} onClick={cancel}>×</span>
          </div>
        </div>
      }
      {!clickAddList && 
        <div className={style.addList} onClick={() => setClickAddList(prev => !prev)}>
          <span className={style.plus}>+</span>
          {title}
        </div>
      }
      
    </>
    

  )
}

export default AddListForm