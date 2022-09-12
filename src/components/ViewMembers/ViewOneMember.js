import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import {addNotificationToDataBase} from '../../features/exportFunctions'
import { currentCardsState } from '../../store/slices/currentCardsSlice'
import { currentListsState } from '../../store/slices/currentListsSlice'
import Initials from '../../components/Initials'
import style from '../../assets/scss/board.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'
import styless from '../../assets/scss/deleteForm.module.scss'

const ViewOneMember = ({currentBoard, currentMember}) => {
    const user = useSelector((state) => state.user.user)
    const cards = useSelector(currentCardsState)
    const lists = useSelector(currentListsState)
    const [clickRemove, setClickRemove] = useState(false)
    const [attachedToCards, setAttachedToCards] = useState([])
    const isPersonalBoard = user.id === currentBoard.owner

    useEffect(() => {
        const data = []
        cards && 
            cards.map((card) => {
                if (card.assignedUsers.includes(currentMember.id)) {
                    data.push([card.listID, card.cardTitle, card.id])
                }
            })
        setAttachedToCards(data)
    },[cards])
    
    const removeMemberFromBoard = async(e) => {
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

        addNotificationToDataBase(currentMember.id, user.id, 'removed you from this board', '', currentBoard.id)
    }

    const confirmRemoveMemberFromBoard = (e) => {
        e.stopPropagation()
        attachedToCards &&
            attachedToCards.map(async(item) => {
                const curCard = cards.find(ob => ob.id === item[2])
                const data = [...curCard.assignedUsers]
                const changedData = data.filter((id) => id !== currentMember.id)
                const docRef = doc(db, 'cards', curCard.id)
                await updateDoc(docRef, {
                    assignedUsers: [...changedData],
                })
                addNotificationToDataBase(currentMember.id, user.id, 'removed you from this card', curCard.id, currentBoard.id)
            })
        removeMemberFromBoard(e)
    }


    return (
        <>                               
            <div className={style.viewMember}>
                <Initials user={currentMember} />
                <span>{currentMember.firstName + ' ' + currentMember.lastName}</span>
                <span style={{marginLeft:'15px',color:'#666'}}>{currentMember.email}</span>
                {isPersonalBoard ? 
                    <span
                        style={{marginLeft:'auto', backgroundColor: 'rgba(73, 136, 245, 0.1)', borderRadius:'3px'}}
                        className={styles.closeForm} 
                        onClick={(e) => attachedToCards.length === 0 
                            ? removeMemberFromBoard(e) 
                            : setClickRemove(true)}> 
                        × 
                    </span> 
                    : null
                }
            </div>
            {clickRemove 
                ? <div className={styless.deleteCardForm} style={{width:'70%',margin:'auto'}}>
                    <span><b>{currentMember.firstName + ' ' + currentMember.lastName}</b></span> is attached to such cards: 
                    <div>
                        {attachedToCards &&
                            attachedToCards.map((item) => {
                                const curList = lists.find(ob => ob.id === item[0])
                                return (
                                    <p key={item[2]}>
                                        <b>{item[1]}</b> {' (' + curList.listTitle + ')'}
                                    </p>
                                )
                            })}
                    </div>
                    <div className={style.line}></div>
                    <p style={{padding:'0 10px'}}>
                        Remove from this board anyway 
                        and cancel attachment to all of these cards?
                    </p>
                    <div style={{marginTop:'-10px'}}>
                        <button className={styless.buttonYes} 
                            style={{fontSize:'16px'}}
                            onClick={(e) => confirmRemoveMemberFromBoard(e)}>
                            Yes
                        </button>
                        <button className={styless.buttonNo}
                            style={{fontSize:'16px'}} 
                            onClick={(e) => {setClickRemove(false); e.stopPropagation()}}>
                            No
                        </button>
                    </div>
                </div> 
                : null}
        </>
    )
}

export default ViewOneMember