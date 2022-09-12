import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { collection, orderBy, doc, query, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import Card from '../Card'
import style from '../../assets/scss/card.module.scss'
import { setCurrentDragStartCard, currentDragStartCardState } from '../../store/slices/currentDragStartCardSlice'

const Cards = ({list, cards, draggingCard, setDraggingCard, listsCardsToRender, setListsCardsToRender}) => {
    const dispatch = useDispatch()
    const currentDragStartCard = useSelector(currentDragStartCardState)
    const dragItemCard = useRef()
    const dragItemCardNode = useRef()

    const handleDragStartCard = (e, item) => {
        e.stopPropagation()
        dragItemCard.current = item.index
        dragItemCardNode.current = e.target
        const listIndex = listsCardsToRender.findIndex(el => el.list.id === list.id)
        
        dispatch(setCurrentDragStartCard({
            cardIndex: dragItemCard.current,
            listIndex: listIndex,
            listID: list.id,
            cardID: item.card.id,
        }))

        dragItemCardNode.current.addEventListener('dragend', handleDragEndCard)
        
        setTimeout(function(){
            setDraggingCard(true)
          }, 0)
    }

    const handleDragEnterCard = (e, targetItem) => {
        let copyCards = [...listsCardsToRender]
        const listIndexForEnterCard = listsCardsToRender.findIndex(el => el.list.id === list.id)
        const dragItemContent = copyCards[currentDragStartCard.listIndex].cards[currentDragStartCard.cardIndex]
        copyCards[currentDragStartCard.listIndex].cards.splice(currentDragStartCard.cardIndex, 1)
        copyCards[listIndexForEnterCard].cards.splice(targetItem.index, 0, dragItemContent)
        
        setListsCardsToRender(copyCards)
        
        dispatch(setCurrentDragStartCard({
            listIndex: listIndexForEnterCard,
            cardIndex: targetItem.index,
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
                
        listsCardsToRender && 
            listsCardsToRender.map((listItem, indexList) => {
                listItem.cards &&
                    listItem.cards.map(async (card, indexCard) => {
                        const docRef = doc(db, 'cards', card.id)
                        
                        await updateDoc(docRef, {
                            listID: listsCardsToRender[indexList].list.id,
                            position: parseInt(indexCard) + 1,
                            })
            })
        })
    }

    const handleDragEndCard = (e) => {
        setDraggingCard(false)
        dragItemCard.current = null
        dragItemCardNode.current.removeEventListener('dragend', handleDragEndCard)
        dragItemCardNode.current = null
    }

    const getStyles = (position) => {
        if (currentDragStartCard.cardIndex === position && currentDragStartCard.listID === list.id) {
            return style.cardBackgroundOpacity
        }
        return style.cardForeground
    }
    
    return (
        cards && 
            cards.map((card, index) => {
                return (
                    <div key={card.id} className={style.cardBackground}>
                        <div 
                            onDragStart={(e) => handleDragStartCard(e, {index, card})}
                            onDragEnter={draggingCard ? (e) => {handleDragEnterCard(e, {index, card})} : null}
                            onDragOver={draggingCard ? (e) => {allowDropCard(e)} : null}
                            onDragLeave={draggingCard ? (e) => {handleDragLeaveCard(e)} : null} 
                            onDrop={(e) => {handleDropCard(e)}}
                            className={draggingCard ? getStyles(index): style.cardForeground}
                            draggable={true}
                            >
                            <Card card={card} list={list}/>
                        </div>
                    </div>
                )
            })
    )
}

export default Cards