import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import Initials from '../../ui/Initials'
import CloseButton from '../../ui/CloseButton'
import Line from '../../ui/Line'
import ShortenTitle from '../../ui/ShortenTitle'
import { notificationsState } from '../../store/slices/notificationsSlice'
import { allCardsState } from '../../store/slices/allCardsSlice'
// import { allListsState } from '../../store/slices/allListsSlice'
import { allBoardsState } from '../../store/slices/allBoardsSlice'
import useOutsideClick from '../../hooks/useOutsideClick'
import styles from '../../assets/scss/topbar.module.scss'
import styless from '../../assets/scss/boardsList.module.scss'

const OneNotification = ({notification}) => {
    const user = useSelector((state) => state.user.user)
    const boards = useSelector(allBoardsState)
    const cards = useSelector(allCardsState)
    const users = useSelector((state) => state.users.users)
    let navigate = useNavigate()
    const currentCard = cards.find(ob => ob.id === notification?.cardID)
    const cardname = notification.hasOwnProperty('cardTitle') ? notification.cardTitle : ''
    const curCardTitle = currentCard ? currentCard.cardTitle : cardname 
    const currentBoard = boards.find(ob => ob.id === notification?.boardID)
    const fromUser = users.find(ob => ob.id === notification?.fromUser)
    const color = currentBoard ? currentBoard.boardColor : notification.boardColor
    const isReadColor = notification.read ? '#ffe' : 'rgba(73, 136, 245, 0.3)' 
    const requireNavigation = currentBoard && currentBoard.statusOpened && currentBoard.invitedMembers.includes(user.id)
    

    const handleNavigateBoard =(e, currentBoard) => {
        if (currentBoard.invitedMembers.includes(user.id) || currentBoard.owner === user.id) {
            navigate('/auth/board/' + currentBoard.id)
        } 
    }
    
    return (
        <div key={notification.id} style={{backgroundColor:isReadColor}}>
            <div className={styles.notificationCard} >
                <div 
                    style={{width:'100%', backgroundColor: color, padding:'10px', lineHeight:'1.5', 
                    cursor: requireNavigation ? 'pointer' : 'auto'}}
                    onClick={requireNavigation ? (e) => handleNavigateBoard(e, currentBoard) : undefined}>
                    <div style={{display:'flex', gap:'10px'}}>
                        <b><ShortenTitle title={currentBoard ? currentBoard.boardTitle : notification.boardTitle} number={15}/></b> 
                    </div>
                    <div style={{backgroundColor:'white', width:'100%', borderRadius:'3px', padding:'6px'}}>
                        <ShortenTitle title={curCardTitle} number={30}/>
                    </div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'10px', padding:'10px'}}>
                    { fromUser ?
                        <>
                            <Initials user={fromUser}/>
                            {fromUser.firstName + ' ' + fromUser.lastName}
                        </>
                        : <span>Someone</span>}
                </div>
                <div style={{paddingLeft:'10px'}}>{notification.text}</div>
                <div style={{fontSize:'12px', display:'flex', justifyContent:'end', padding:'10px 10px 0'}}>{notification.time}</div>
            </div>
        </div>
    )
}

export default OneNotification