import React, {useState} from 'react'
import { useSelector } from 'react-redux'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { currentCardsState } from '../../store/slices/currentCardsSlice'
import CloseButton from '../../ui/CloseButton'
import style from '../../assets/scss/addCardForm.module.scss'

const AddCardForm = ({list, curBoardId}) => {
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
      assignedUsers: [],
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
            <div style={{marginLeft:'auto', borderRadius:'6px',
                        backgroundColor: '#ffe'}}>
              <CloseButton  onClick={cancel}/>
            </div>
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