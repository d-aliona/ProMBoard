import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import {addNotificationToDataBase} from '../../features/exportFunctions'
import { currentCardsState } from '../../store/slices/currentCardsSlice'
import { currentListsState } from '../../store/slices/currentListsSlice'
import Initials from '../../ui/Initials'
import CloseButton from '../../ui/CloseButton'
import ShortenTitle from '../../ui/ShortenTitle'
import style from '../../assets/scss/board.module.scss'
import styles from '../../assets/scss/deleteForm.module.scss'

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
                {isPersonalBoard 
                    ?   <div 
                            style={{marginLeft:'auto', borderRadius:'6px',
                            background: 'linear-gradient(90deg, rgba(73, 136, 245, 0) 0%, rgba(73, 136, 245, 0.2) 100%)'}}>
                            <CloseButton 
                                onClick={(e) => attachedToCards.length === 0 
                                ? removeMemberFromBoard(e) 
                                : setClickRemove(true)}/>
                        </div>
                    :   null
                }
            </div>
            {clickRemove 
                ? <div className={styles.deleteCardForm} style={{width:'70%',margin:'auto'}}>
                    <span><b>{currentMember.firstName + ' ' + currentMember.lastName}</b></span> is attached to such cards: 
                    <div>
                        {attachedToCards &&
                            attachedToCards.map((item) => {
                                const curList = lists.find(ob => ob.id === item[0])
                                return (
                                    <p key={item[2]} style={{display: 'flex', justifyContent:'center', gap:'10px'}}>
                                        <b><ShortenTitle title={item[1]} number={15}/></b> 
                                        (<ShortenTitle title={curList.listTitle} number={15}/>) 
                                    </p>
                                )
                            })}
                    </div>
                    <p style={{padding:'16px 10px 0'}}>
                        Remove from this board anyway 
                        and cancel attachment to all of these cards?
                    </p>
                    <div style={{marginTop:'-10px'}}>
                        <button className={styles.buttonYes} 
                            style={{fontSize:'16px'}}
                            onClick={(e) => confirmRemoveMemberFromBoard(e)}>
                            Yes
                        </button>
                        <button className={styles.buttonNo}
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