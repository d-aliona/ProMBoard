import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, orderBy, doc, query, onSnapshot, where } from 'firebase/firestore'
import { db, usersCollection } from '../../firebase-client'

import { currentCardsState } from '../../store/slices/currentCardsSlice'
import style from '../../assets/scss/addCardForm.module.scss'

const AddCardForm = ({list, curBoardId}) => {
    // const title = props.title
    // const curBoardId = props.curBoardId
    // const ref = useRef()
    const cards = useSelector(currentCardsState)
    const user = useSelector((state) => state.user.user)
    const [clickAddCard, setClickAddCard] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    const disabled = cardTitle ? '' : style.disabled
    
    const selectedCards = cards.filter((card) => card.boardID === curBoardId && card.listID === list.id)

    const addCard = async (e) => {
      e.preventDefault()
      setCardTitle('')
      setClickAddCard(false)
      
      const cardsCol = collection(db, 'cards')

      await addDoc(cardsCol, {
        cardTitle: cardTitle,
        description: '',
        users: [],
        listID: list.id,
        boardID: curBoardId,
        commentsExist: false,
        commentsNumber: 0,
        position: selectedCards.length ? selectedCards.length + 1 : 1 
      }).catch((err) => {
        console.error(err)
      })
    }

    const cancel = () => {
      setClickAddCard(false)
      setCardTitle('')
    }

  return (
    <>
      {clickAddCard && 
        <form className={style.addForm} onSubmit={addCard}>
          <textarea rows="2" 
            placeholder='Enter a title for this card'
            className={style.inputTitle}
            autoFocus
            required
            value={cardTitle}
            onChange={(e) => {
              setCardTitle(e.target.value)
            }}
            >
          </textarea>
          <div className={style.actions}>
            <button className={`${style.action} ${disabled}`} type='submit'>
              Add card
            </button>
            {/* <span className={style.action} onClick={addCard}>+</span> */}
            <span className={style.action} onClick={cancel}>×</span>
          </div>
        </form>
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