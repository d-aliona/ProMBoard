import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import Initials from '../../ui/Initials'
import CloseButton from '../../ui/CloseButton'
import Line from '../../ui/Line'
import { notificationsState } from '../../store/slices/notificationsSlice'
import { allCardsState } from '../../store/slices/allCardsSlice'
import { allListsState } from '../../store/slices/allListsSlice'
import { allBoardsState } from '../../store/slices/allBoardsSlice'
import useOutsideClick from '../../hooks/useOutsideClick'
import styles from '../../assets/scss/topbar.module.scss'
import styless from '../../assets/scss/boardsList.module.scss'

const Notification = () => {
    const user = useSelector((state) => state.user.user)
    const boards = useSelector(allBoardsState)
    const cards = useSelector(allCardsState)
    const lists = useSelector(allListsState)
    const users = useSelector((state) => state.users.users)
    const [showDropWindow, setShowDropWindow] = useState(false)
    const notifications = useSelector(notificationsState)
    const [newNotificationExist, setNewNotificationExist] = useState(false)
    let navigate = useNavigate()
    
    useEffect(() => {
        if (notifications.some(el => el.read === false)) {
            setNewNotificationExist(true)
        } else {
            setNewNotificationExist(false)
        }
    },[notifications])
    
    useEffect(() => {
        if (notifications.length > 0 && !showDropWindow) {
            const dataToChange = notifications.filter(ob => ob.read === false)
            
            dataToChange.forEach(async(item) => {
                const docRef = doc(db, 'users', user.id, 'notifications', item.id)
                await updateDoc(docRef, {
                    read: true,
                })
            })
        }
    },[showDropWindow])

    const ref = useOutsideClick(() => setShowDropWindow(false))

    const toggle = async(e) => {
        setShowDropWindow(prev => !prev)
        e.stopPropagation()
    }

    const handleNavigateBoard =(e, currentBoard) => {
        if (currentBoard.invitedMembers.includes(user.id) || currentBoard.owner === user.id) {
            navigate('/auth/board/' + currentBoard.id)
        } 
    }

    const deleteAllNotifications = (e) => {
        e.stopPropagation()
        notifications &&
            notifications.forEach(async(item) => {
                const docRef = doc(db, 'users', user.id, 'notifications', item.id)
                await deleteDoc(docRef)
        })
    }
       
    return (
        <>
            <div onClick={toggle} 
                style={{display:'flex', alignItems:'center', marginLeft:'20px'}}>
                <div className={styles.bellicon}>
                    <div className={`${newNotificationExist ? styles.newnotification : null}`}></div>
                </div>
            </div>
            {showDropWindow && (
                <div className={styles.dropListAuth} 
                    style={{padding:'10px 0', maxHeight:'90vh', overflowY:'auto', minWidth:'340px',backgroundColor:'#ffe'}} 
                    ref={ref}>
                    <div className={styless.title}>
                        <span className={styless.titleName} >
                            Notifications 
                        </span>
                        <CloseButton onClick={() => setShowDropWindow(false)}/>
                    </div>
                    <Line width={'96%'}/>
                    {notifications.length > 0 
                        ? <div
                            onClick={(e) => deleteAllNotifications(e)} 
                            style={{cursor:'pointer', textDecoration:'underline', padding:'0 0 4px 10px'}}>
                            Delete all
                          </div> 
                        : <div style={{paddingLeft:'10px'}}>There are no notifications for you</div>}
                    {notifications &&
                        notifications.map((item) => {
                            const currentCard = cards.find(ob => ob.id === item.cardID)
                            const currentBoard = boards.find(ob => ob.id === item.boardID)
                            const currentList = currentCard ? lists.find(ob => ob.id === currentCard.listID) : null
                            const fromUser = users.find(ob => ob.id === item.fromUser)
                            const color = currentBoard.boardColor
                            const isReadColor = item.read ? '#ffe' : 'rgba(73, 136, 245, 0.3)' 
                            return (
                                <div key={item.id} style={{backgroundColor:isReadColor}}>
                                    <div className={styles.notificationCard} >
                                        <div 
                                            style={{width:'100%', backgroundColor: color, padding:'10px', lineHeight:'1.5', cursor:'pointer'}}
                                            onClick={(e) => handleNavigateBoard(e, currentBoard)}>
                                            <b>{currentBoard.boardTitle} </b> 
                                            {currentList ? ' : ' + currentList.listTitle : ''}
                                            <div style={{backgroundColor:'white', width:'100%', borderRadius:'3px', padding:'6px'}}>
                                                {currentCard?.cardTitle}
                                            </div>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', gap:'10px', padding:'10px'}}>
                                            <Initials user={fromUser}/>
                                            {fromUser.firstName + ' ' + fromUser.lastName}
                                        </div>
                                        <div style={{paddingLeft:'10px'}}>{item.text}</div>
                                        <div style={{fontSize:'12px', display:'flex', justifyContent:'end', padding:'10px 10px 0'}}>{item.time}</div>
                                    </div>
                                </div>)
                        })}
                </div>
            )}    
        </>
    )
}

export default Notification