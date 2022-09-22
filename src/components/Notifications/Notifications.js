import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import CloseButton from '../../ui/CloseButton'
import Line from '../../ui/Line'
import { notificationsState } from '../../store/slices/notificationsSlice'
import OneNotification from './OneNotification'
import useOutsideClick from '../../hooks/useOutsideClick'
import styles from '../../assets/scss/topbar.module.scss'
import styless from '../../assets/scss/boardsList.module.scss'

const Notifications = () => {
    const user = useSelector((state) => state.user.user)
    const [showDropWindow, setShowDropWindow] = useState(false)
    const notifications = useSelector(notificationsState)
    const [newNotificationExist, setNewNotificationExist] = useState(false)
    
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
                            return <OneNotification notification={item} key={item.id}/>
                        })}
                </div>
            )}    
        </>
    )
}

export default Notifications