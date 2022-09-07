import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { collection, orderBy, doc, query, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import Initials from '../../components/Initials'
import { setNotifications, notificationsState } from '../../store/slices/notificationsSlice'
import { currentCardsState } from '../../store/slices/currentCardsSlice'
import { currentListsState } from '../../store/slices/currentListsSlice'
import { allBoardsState } from '../../store/slices/allBoardsSlice'
import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/logo.module.scss'
import styles from '../../assets/scss/topbar.module.scss'
import styless from '../../assets/scss/boardsList.module.scss'

const Notification = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const boards = useSelector(allBoardsState)
    const cards = useSelector(currentCardsState)
    const lists = useSelector(currentListsState)
    const users = useSelector((state) => state.users.users)
    const [showDropWindow, setShowDropWindow] = useState(false)
    // const [newNotification, setNewNotification] = useState(true)
    const ref = useOutsideClick(() => {setShowDropWindow(false)})
    const notifications = useSelector(notificationsState)
    
    useEffect(() => {
        
        const notificationsCol = collection(db, 'users', user.id, 'notifications')
        const qNotifications = query(notificationsCol, orderBy('time', "desc"))
        
        onSnapshot(qNotifications, (snapshot) => {
            const notificationsSnap = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            dispatch(setNotifications(notificationsSnap))
        })
    }, [user])

    const toggle = async(e) => {
        setShowDropWindow(prev => !prev)
        e.stopPropagation()

        const docRef = doc(db, 'users', user.id)
        await updateDoc(docRef, {
            newNotificationExist: false,
        })
    }
    
    return (
        <>
            <div className={style.logo} onClick={toggle}>
                <div className={style.bellicon}>
                    <div className={`${user.newNotificationExist ? style.newnotification : null}`}></div>
                </div>
            </div>
            {showDropWindow && (
                <div className={styles.dropListAuth} style={{padding:'10px'}} ref={ref}>
                    <div className={styless.title}>
                        <span className={styless.titleName} >
                            Notifications 
                        </span>
                        <span
                            className={styless.closeForm} 
                            onClick={(e) => {e.stopPropagation(); }}> 
                            × 
                        </span>
                    </div>
                    <hr className={styless.line} />
                    {notifications &&
                        notifications.map((item) => {
                            // const currentMember = users.find(ob => ob.id === memberID)
                            const currentCard = cards.find(ob => ob.id === item.cardID)
                            const currentBoard = boards.find(ob => ob.id === item.boardID)
                            const currentList = currentCard ? lists.find(ob => ob.id === currentCard.listID) : null
                            const fromUser = users.find(ob => ob.id === item.fromUser)
                            console.log(boards)
                            console.log(currentBoard)
                            // const color = currentBoard.boardColor
                            return (
                                <div className={styles.notificationCard} >
                                    <div style={{width:'100%', backgroundColor: '#aaa'}}>
                                        {currentBoard.boardTitle}  
                                        {currentList ? ':' + currentList.listTitle : ''}
                                        <div style={{backgroundColor:'white', width:'90%'}}>
                                            {currentCard?.cardTitle}
                                        </div>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <Initials user={fromUser}/>
                                        {fromUser.firstName + ' ' + fromUser.lastName}
                                    </div>
                                    {item.text}
                                    {item.time}
                                </div>)
                        })}
                </div>
            )}    
        </>
    )
}

export default Notification