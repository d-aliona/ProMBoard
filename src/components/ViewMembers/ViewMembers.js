import React, {useState, useEffect, useRef, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { doc, updateDoc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import useOutsideClick from '../../hooks/useOutsideClick'
import Initials from '../../components/Initials'
import style from '../../assets/scss/board.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'

const ViewMembers = ({currentBoard}) => {
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const [showMembers, setShowMembers] = useState(false)
    const ref = useOutsideClick(() => setShowMembers(false))
    const currentOwner = users.find(member => member.id === currentBoard.owner)
    const isPersonalBoard = user.id === currentBoard.owner
    
    const removeMemberFromBoard = async(e, currentMember) => {
        e.stopPropagation()

        const dataBoard = [...currentBoard.invitedMembers]
        const changedDataBoard = dataBoard.filter((id) => id !== currentMember.id)
        const docRef = doc(db, 'boards', currentBoard.id)
        await updateDoc(docRef, {
            invitedMembers: [...changedDataBoard],
        })

        const dataUser = [...currentMember.guestBoards]
        const changedDataUser = dataUser.filter((id) => id !== currentBoard.id)
        const doccRef = doc(db, 'users', currentMember.id)
        await updateDoc(doccRef, {
            guestBoards: [...changedDataUser],
        })

        const colRef = collection(db, 'users', currentMember.id, 'notifications')
        addDoc(colRef, {
            fromUser: user.id,
            time: new Date().toLocaleString('en-GB'),
            read: false,
            text: 'removed you from this board',
            cardID: '',
            boardID: currentBoard.id, 
        })
        .catch((error) => {
            console.error(error.message)
        })

        const dcRef = doc(db, 'users', currentMember.id)
        await updateDoc(dcRef, {
            newNotificationExist: true,
        }) 
    }

    return (
        <>
            <div 
                className={style.headMenu} 
                style={{cursor:'pointer', position:'relative'}}
                onClick={(e) => {setShowMembers(prev => !prev); e.stopPropagation()}}>
                View members
            </div>
            {showMembers && (
                <div className={styles.dropViewMembers} ref={ref}>
                    <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Owner</p>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <Initials user={currentOwner} />
                            <span>{currentOwner.firstName + ' ' + currentOwner.lastName}</span>
                            <span style={{marginLeft:'15px',color:'#666'}}>{currentOwner.email}</span>
                        </div>
                    <hr className={styles.line} />
                    <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Invited members</p>
                    {currentBoard.invitedMembers.length > 0
                        ? currentBoard.invitedMembers.map((memberID, id) => {
                            const currentMember = users.find(user => user.id === memberID)
                            return (
                                <div className={style.viewMember}>
                                    <Initials user={currentMember} />
                                    <span>{currentMember.firstName + ' ' + currentMember.lastName}</span>
                                    <span style={{marginLeft:'15px',color:'#666'}}>{currentMember.email}</span>
                                    {isPersonalBoard ? 
                                        <span
                                            style={{marginLeft:'auto', backgroundColor: 'rgba(73, 136, 245, 0.1)', borderRadius:'3px'}}
                                            className={styles.closeForm} 
                                            onClick={(e) => removeMemberFromBoard(e, currentMember)}> 
                                            × 
                                        </span> 
                                        : null
                                    }
                                </div>)
                        })
                        : <div>There are no invited members</div> 
                    }
                </div>
            )}
        </>
    )
}

export default ViewMembers