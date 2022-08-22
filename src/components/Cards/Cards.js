import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { collection, orderBy, doc, query, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import AddCardForm from '../../features/AddCardForm'
import Card from '../Card'
import style from '../../assets/scss/card.module.scss'
// import { setCurrentDragEndCard, currentDragEndCardState } from '../../store/slices/currentDragEndCardSlice'
import { setCurrentDragStartCard, currentDragStartCardState } from '../../store/slices/currentDragStartCardSlice'


const Cards = ({list, curBoardId, draggingCard, setDraggingCard}) => {
    const dispatch = useDispatch()
    // const user = useSelector((state) => state.user.user)
    const cards = useSelector(currentCardsState)
    const currentDragStartCard = useSelector(currentDragStartCardState)
    // const currentDragEndCard = useSelector(currentDragEndCardState)
    let selectedCards = cards
        .filter((card) => card.listID === list.id)
        .sort((a,b) => a.position - b.position)
    
    const dragItemCard = useRef()
    const dragItemCardNode = useRef()

    const handleDragStartCard = (e, item) => {
        dragItemCard.current = item.index
        dragItemCardNode.current = e.target
        
        dispatch(setCurrentDragStartCard({
            order: dragItemCard.current,
            listID: list.id,
            cardID: item.card.id,
        }))

        dragItemCardNode.current.addEventListener('dragend', handleDragEndCard)
        
        setTimeout(function(){
            setDraggingCard(true)
          }, 0)
    }

    const handleDragEnterCard = (e, targetItem) => {
        
        let copyCards = [...cards]
        const indexDragItem = copyCards.findIndex(el => el.id === currentDragStartCard.cardID)
        // console.log('indexItem', indexDragItem)
        // console.log('copycards',copyCards)
        // console.log(copyCards[indexDragItem])
        copyCards &&
            copyCards.map((el) => {
                // console.log(el)
                if (el.listID === list.id) {
                    if (el.position >= targetItem.index) {
                        // console.log('el.position', el.position)
                        el = {...el, position: el.position + 1}
                    } else {return el}
                } else {return el}
            })
        // console.log(copyCards[indexDragItem]) 
        copyCards[indexDragItem] = {...copyCards[indexDragItem], listID: list.id, position: targetItem.index}
        // console.log(copyCards[indexDragItem])    
        // copyCards[indexDragItem].listID = list.id
        // copyCards[indexDragItem].position = targetItem.index

        copyCards &&
            copyCards.map((el) => {
                if (el.listID === currentDragStartCard.listID) {
                    if (el.position > currentDragStartCard.position) {
                        el = {...el, position: el.position - 1}
                        // el.position = el.position - 1
                    } else {return el}
                } else {return el}
            })

        dispatch(setCurrentCards(copyCards))

        dispatch(setCurrentDragStartCard({
            order: targetItem.index,
            listID: list.id,
            cardID: currentDragStartCard.cardID
        }))
    }

    const handleDragLeaveCard = (e) => {
        e.preventDefault()
    }
    
    const allowDropCard = (e) => {
    e.preventDefault()
    }

    const handleDropCard = (e) => {
        e.preventDefault()
        
        cards && 
            cards.map(async (card, index) => {
                const docRef = doc(db, 'cards', card.id)
                        
                await updateDoc(docRef, {
                    listID: card.listID,
                    position: card.position,
            })
        })
    }

    const handleDragEndCard = (e) => {
        setDraggingCard(false)
        dragItemCard.current = null
        dragItemCardNode.current.removeEventListener('dragend', handleDragEndCard)
        dragItemCardNode.current = null
    }
    
    return (
        selectedCards && 
            selectedCards.map((card, index) => {
                return (
                    <div className={style.cardBackground}>
                        <div key={index} 
                            onDragStart={(e) => handleDragStartCard(e, {index, card})}
                            onDragEnter={draggingCard ? (e) => {handleDragEnterCard(e, {index, card})} : null}
                            onDragOver={draggingCard ? (e) => {allowDropCard(e)} : null}
                            onDragLeave={draggingCard ? (e) => {handleDragLeaveCard(e)} : null} 
                            onDrop={(e) => {handleDropCard(e)}}
                            draggable={true}
                            >
                            <Card card={card} />
                        </div>
                    </div>
                )
            })
    )
}

export default Cards