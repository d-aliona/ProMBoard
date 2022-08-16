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
import { setCurrentDragEndCard, currentDragEndCardState } from '../../store/slices/currentDragEndCardSlice'
import { setCurrentDragStartCard, currentDragStartCardState } from '../../store/slices/currentDragStartCardSlice'


const Cards = ({list, curBoardId}) => {
    const dispatch = useDispatch()
    // const user = useSelector((state) => state.user.user)
    const cards = useSelector(currentCardsState)
    // const currentDragStartCard = useSelector(currentDragStartCardState)
    // const currentDragEndCard = useSelector(currentDragEndCardState)
    const selectedCards = cards
        .filter((card) => card.listID === list.id)
        .sort((a,b) => a.position - b.position)

    const dragItem = useRef()
    const dragOverItem = useRef()

    // useEffect(() => {
    //     dispatch(setCurrentDragStartCard({
    //         order: dragItem.current,
    //         listId: list.id,
    //     }))
    //     dispatch(setCurrentDragEndCard({
    //         order: dragOverItem.current,
    //         listID: list.id,
    //     }))
        
    // }, [dispatch, list])
    
    const dragStart = (e, position) => {
        dragItem.current = position
        dispatch(setCurrentDragStartCard({
            order: dragItem.current,
            listId: list.id,
        }))
        // console.log(dragItem)
        // console.log(dragItem.current)
        
        setTimeout(function(){
            e.target.style.visibility = "hidden"
        }, 0)
    }

    const dragEnter = (e, position) => {
        dragOverItem.current = position
        dispatch(setCurrentDragEndCard({
            order: dragOverItem.current,
            listID: list.id,
        }))
        // e.target.style.visibility = "hidden"
        // console.log(e.target.innerHTML)
    }

    const drop = (e) => {
        e.preventDefault()
        e.target.style.visibility = "visible"
        
        const dragStartCards = cards
            .filter((card) => card.listID === currentDragStartCard.listID)
            .sort((a,b) => a.position - b.position)
        const dropEndCards = cards
            .filter((card) => card.listID === currentDragEndCard.listID)
            .sort((a,b) => a.position - b.position)

        const copyStartCards = [...dragStartCards]
        const dragItemContent = copyStartCards[currentDragStartCard.order]
        copyStartCards.splice(currentDragStartCard.order, 1)
        dragItem.current = null
        copyStartCards && 
            copyStartCards.map(async(card, index) => {
                const docRef = doc(db, 'cards', card.id)

                await updateDoc(docRef, {
                    position: index + 1,
                })
            })

        const copyEndCards = [...dropEndCards]
        // const dragItemContent = copyStartCards[currentDragStartCard.order]
        copyEndCards.splice(currentDragEndCard.order, 0, dragItemContent)
        dragOverItem.current = null
        copyEndCards && 
            copyEndCards.map(async(card, index) => {
                const docRef = doc(db, 'cards', card.id)

                await updateDoc(docRef, {
                    position: index + 1,
                })
            })

        // const copyListItems = [...sortedLists];
        // const dragItemContent = copyListItems[dragItem.current];
        // copyListItems.splice(dragItem.current, 1);
        // copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        // dragItem.current = null;
        // dragOverItem.current = null;
            
        // copyListItems && 
        //   copyListItems.map(async (list, index) => {
        //     const docRef = doc(db, 'lists', list.id)
                    
        //     await updateDoc(docRef, {
        //       position: parseInt(index) + 1,
        //     })
        //   })
      }
    
    return (
        selectedCards && 
            selectedCards.map((card, index) => {
                return (
                    <div className={style.cardBackground}>
                        <div key={index} 
                            onDragStart={(e) => dragStart(e, index)}
                            onDragEnter={(e) => dragEnter(e, index)}
                            onDragEnd={(e) => drop(e)}
                            draggable={true}>
                            <Card card={card} />
                        </div>
                    </div>
                )
            })
    )
}

export default Cards