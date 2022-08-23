import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { collection, orderBy, doc, query, onSnapshot } from 'firebase/firestore'
import { usersCollection } from '../../firebase-client'

import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import AddCardForm from '../../features/AddCardForm'
import useOutsideClick from '../../hooks/useOutsideClick'
import CardTitle from './CardTitle'
import CardDescription from './CardDescription'
import CardComment from './CardComment'

import style from '../../assets/scss/card.module.scss'


const Card = ({card, list}) => {
    const [show, setShow] = useState(false)
    
    const handleClickToOpenCard = (e) => {
        setShow(prev => !prev)
        e.stopPropagation()
    }

    const handleClickOutside = () => {
        setShow(false)
    }

    const ref = useOutsideClick(handleClickOutside)
    
    return (
        <>
            <div className={style.cardWrapper} >
                <div className={style.cardTitle} onClick={handleClickToOpenCard}>
                    {card.cardTitle}
                    {card.description ? 
                        <abbr title="This card has a description">
                            <div className={style.descriptioniconMini}></div>
                        </abbr> 
                        : null }
                </div>
            </div>
            {show && (
                <div className={style.window}>
                    <div className={style.openedCardModal} ref={ref}>
                        <CardTitle card={card} list={list} setShow={setShow}/>
                        <div style={{display: 'flex'}}>
                            <div style={{width:'75%'}}>
                                {/* <CardMembers /> */}
                                <CardDescription card={card} />
                                <CardComment card={card} />
                            </div>
                            {/* <CardSidebar /> */}
                        </div>
                    </div>
                </div>
            )}    
        </>
    )
}

export default Card