import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import Initials from '../../ui/Initials'
import ShortenTitle from '../../ui/ShortenTitle'
import { allCardsState } from '../../store/slices/allCardsSlice'
import { allBoardsState } from '../../store/slices/allBoardsSlice'
import styles from '../../assets/scss/topbar.module.scss'

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
        <div  style={{backgroundColor:isReadColor}}>
            <div className={styles.notificationCard} >
                <div 
                    style={{width:'100%', backgroundColor: color, padding:'10px', lineHeight:'1.5', 
                    cursor: requireNavigation ? 'pointer' : 'auto'}}
                    onClick={requireNavigation ? (e) => handleNavigateBoard(e, currentBoard) : undefined}>
                    <div style={{display:'flex', gap:'10px'}}>
                        <b><ShortenTitle title={currentBoard ? currentBoard.boardTitle : notification.boardTitle} number={28}/></b> 
                    </div>
                    <div style={{backgroundColor:'white', width:'100%', borderRadius:'3px', padding:'6px'}}>
                        <ShortenTitle title={curCardTitle} number={28}/>
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