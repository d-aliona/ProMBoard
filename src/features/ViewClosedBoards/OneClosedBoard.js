import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import {addNotificationToDataBase} from '../../features/exportFunctions'
import { allCardsState } from '../../store/slices/allCardsSlice'
import { allListsState } from '../../store/slices/allListsSlice'
import Initials from '../../ui/Initials'
import CloseButton from '../../ui/CloseButton'
import ShortenTitle from '../../ui/ShortenTitle'
import Button from '../../ui/Button'
import style from '../../assets/scss/boardsList.module.scss'
// import style from '../../assets/scss/board.module.scss'
import styles from '../../assets/scss/deleteForm.module.scss'

const OneClosedBoard = ({currentBoard}) => {
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const cards = useSelector(allCardsState)
    const lists = useSelector(allListsState)
    const [clickRemove, setClickRemove] = useState(false)
        
    // useEffect(() => {
    //     const data = []
    //     cards && 
    //         cards.map((card) => {
    //             if (card.assignedUsers.includes(currentMember.id)) {
    //                 data.push([card.listID, card.cardTitle, card.id])
    //             }
    //         })
    //     setAttachedToCards(data)
    // },[cards])
    
    // const removeMemberFromBoard = async(e) => {
    //     e.stopPropagation()

    //     const dataBoard = [...currentBoard.invitedMembers]
    //     const changedDataBoard = dataBoard.filter((id) => id !== currentMember.id)
    //     const docRef = doc(db, 'boards', currentBoard.id)
    //     await updateDoc(docRef, {
    //         invitedMembers: [...changedDataBoard],
    //     })

    //     const dataUser = [...currentMember.guestBoards]
    //     const changedDataUser = dataUser.filter((id) => id !== currentBoard.id)
    //     const doccRef = doc(db, 'users', currentMember.id)
    //     await updateDoc(doccRef, {
    //         guestBoards: [...changedDataUser],
    //     })

    //     addNotificationToDataBase(currentMember.id, user.id, 'removed you from this board', '', currentBoard.id)
    // }

    // const confirmRemoveMemberFromBoard = (e) => {
    //     e.stopPropagation()
    //     attachedToCards &&
    //         attachedToCards.map(async(item) => {
    //             const curCard = cards.find(ob => ob.id === item[2])
    //             const data = [...curCard.assignedUsers]
    //             const changedData = data.filter((id) => id !== currentMember.id)
    //             const docRef = doc(db, 'cards', curCard.id)
    //             await updateDoc(docRef, {
    //                 assignedUsers: [...changedData],
    //             })
    //             addNotificationToDataBase(currentMember.id, user.id, 'removed you from this card', curCard.id, currentBoard.id)
    //         })
    //     removeMemberFromBoard(e)
    // }
    const reopenBoard = async(e) => {
        e.preventDefault()
        const docRef = doc(db, 'boards', currentBoard.id)
        await updateDoc(docRef, {
            statusOpened: true,
        })
    }

    const confirmDeleteBoard = async(e) => {
        e.preventDefault()
        
        cards.forEach(async(card) => {
            if (card.boardID === currentBoard.id) {
                if (card.assignedUsers.length > 0) {
                    card.assignedUsers.forEach((member) => {
                        addNotificationToDataBase(member.id, user.id, 'removed you from this card', card.id, card.boardID)
                    })
                }
                await deleteDoc(doc(db, "cards", card.id))
            }
        }) 

        lists
            .filter(el => el.boardID === currentBoard.id)
            .forEach(async(el) => await deleteDoc(doc(db, "lists", el.id)))

        users.forEach(async(member) => {
            if (member.guestBoards.length > 0 && member.guestboards.includes(currentBoard.id)) {
                const dataUser = [...member.guestBoards]
                const changedDataUser = dataUser.filter((id) => id !== currentBoard.id)
                const doccRef = doc(db, 'users', member.id)
                await updateDoc(doccRef, {
                    guestBoards: [...changedDataUser],
                })

                addNotificationToDataBase(member.id, user.id, 'removed you from this board', '', currentBoard.id)
            }
        })
        await deleteDoc(doc(db, "boards", currentBoard.id))
    }

    return (
        <>   
            <div className={style.listItem} 
                style={{padding:'4px', cursor:'auto'}} 
                >
                <div className={style.colorBoard} style={{backgroundColor: `${currentBoard.boardColor}`}}></div>    
                <ShortenTitle title={currentBoard.boardTitle} number={30}/>
                {!clickRemove &&
                    <div style={{marginLeft:'auto', display:'flex', gap:'10px'}}>
                        <Button 
                            title={'Reopen'} 
                            back={'rgba(23, 43, 34, .1)'} 
                            hover={'rgba(23, 43, 34, 1)'}
                            onClick={(e) => reopenBoard(e)}/>
                        <Button 
                            title={'Delete'}
                            back={'rgba(129, 3, 3, .1)'} 
                            hover={'rgb(129, 3, 3)'}
                            onClick={(e) => {e.stopPropagation(); setClickRemove(true)}}/>
                    </div>}
                {clickRemove 
                    ? <div className={styles.deleteCardForm} style={{width:'31%',marginLeft:'auto'}}>
                        <p style={{padding:'2px'}}>
                            All lists, cards will be deleted on this board. <br /><br />
                            Delete board?
                        </p>
                        <div style={{marginTop:'-10px'}}>
                            <button className={styles.buttonYes} 
                                style={{fontSize:'16px'}}
                                onClick={(e) => confirmDeleteBoard(e)}>
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
            </div> 
        </>
    )
}

export default OneClosedBoard