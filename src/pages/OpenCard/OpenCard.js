// import React, {useRef} from 'react'

import Board from '../Board'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { collection, orderBy, doc, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { setCurrentComments, currentCommentsState } from '../../store/slices/currentCommentsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import AddCardForm from '../../features/AddCardForm'
import useOutsideClick from '../../hooks/useOutsideClick'
import CardTitle from '../../components/Card/CardTitle'
import CardMembers from '../../components/Card/CardMembers'
import CardDescription from '../../components/Card/CardDescription'
import CardCommentForm from '../../components/Card/comments/CardCommentForm'
import CardComments from '../../components/Card/comments/CardComments'
import CardSidebar from '../../components/Card/CardSidebar'
import { currentCardsState } from '../../store/slices/currentCardsSlice'
import style from '../../assets/scss/card.module.scss'

const OpenCard = () => {
  // const dispatch = useDispatch()
  let navigate = useNavigate()
  const [clickTitle, setClickTitle] = useState(false) 
  const title = useParams()
  const location = useLocation()
  const { list } = location.state
  const cards = useSelector(currentCardsState)
  const card = cards.find(ob => ob.id === title.idcard)
  const ref = useOutsideClick(() => navigate(-1))

  return (
    <>
      <Board /> 
      <div className={style.window}>
        <div className={style.openedCardModal} ref={ref}>
          <CardTitle card={card} list={list} clickTitle={clickTitle} setClickTitle={setClickTitle}/>
          <div style={{display: 'flex'}}>
            <div style={{width:'75%'}}>
              {card.assignedUsers.length > 0 ? <CardMembers card={card} /> : null}
              <CardDescription card={card} />
              <CardCommentForm card={card} />
              <CardComments card={card} />
            </div>
            <div style={{width:'25%'}}>
              <CardSidebar card={card} setClickTitle={setClickTitle}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OpenCard