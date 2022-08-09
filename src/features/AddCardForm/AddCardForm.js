import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, orderBy, doc, query, onSnapshot, where } from 'firebase/firestore'
import { db, usersCollection } from '../../firebase-client'

import { currentListsState } from '../../store/slices/currentListsSlice'
import style from '../../assets/scss/addCardForm.module.scss'

const AddCardForm = ({list, curBoardId}) => {
    // const title = props.title
    // const curBoardId = props.curBoardId
    // const ref = useRef()
    const lists = useSelector(currentListsState)
    const user = useSelector((state) => state.user.user)
    const [clickAddCard, setClickAddCard] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    // let navigate = useNavigate()

    const addCard = async (e) => {
      e.preventDefault()
      const docRef = doc(usersCollection, user.id, 'personalBoards', curBoardId)
      const listsCol = collection(docRef, 'lists')
      const listDoc = doc(listsCol, list.id)
      
    //   await addDoc(listDoc, {
    //     cardTitle: cardTitle,
    //     position: cards.length ? cards.length + 1 : 1 
    //   }).catch((err) => {
    //     console.error(err)
    //   })

      setCardTitle('')
      setClickAddCard(false)
    }

    const cancel = () => {
      setClickAddCard(false)
      setCardTitle('')
    }

  return (
    <>
      {clickAddCard && 
        <div className={style.addForm}>
          <input 
            className={style.inputTitle}
            type='text'
            placeholder='Enter a title for this card'
            value={cardTitle}
            onChange={(e) => {
                setCardTitle(e.target.value)
            }}
            autoFocus
          />
          <div className={style.actions}>
            <span className={style.action} onClick={addCard}>+</span>
            <span className={style.action} onClick={cancel}>×</span>
          </div>
        </div>
      }
      {!clickAddCard && 
        <div className={style.addCard} onClick={() => setClickAddCard(prev => !prev)}>
          <span className={style.plus}>+</span>
          Add a card
        </div>
      }
      
    </>
    

  )
}

export default AddCardForm