import React, {useState, useEffect, useRef, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { doc, updateDoc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { currentCardsState } from '../../store/slices/currentCardsSlice'
import { currentListsState } from '../../store/slices/currentListsSlice'
import useOutsideClick from '../../hooks/useOutsideClick'
import Initials from '../../components/Initials'
import style from '../../assets/scss/board.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'
import styless from '../../assets/scss/deleteForm.module.scss'

const ViewOneMember = ({currentBoard, currentMember}) => {
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const cards = useSelector(currentCardsState)
    const lists = useSelector(currentListsState)
    // const [showMembers, setShowMembers] = useState(false)
    const [clickRemove, setClickRemove] = useState(false)
    const [attachedToCards, setAttachedToCards] = useState([])
    // const ref = useOutsideClick(() => setShowMembers(false))
    // const currentOwner = users.find(member => member.id === currentBoard.owner)
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
    // console.log(currentMember.email, attachedToCards)
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

    const confirmRemoveMemberFromBoard = (e) => {
        e.stopPropagation()
        attachedToCards &&
            attachedToCards.map(async(item) => {
                const curCard = cards.find(ob => ob.id === item[2])
                const data = [...curCard.assignedUsers]
                const changedData = data.filter((id) => id !== curCard.id)
                const docRef = doc(db, 'cards', curCard.id)
                await updateDoc(docRef, {
                    assignedUsers: [...changedData],
                })
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
                                    <p><b>{item[1]}</b> {' (' + curList.listTitle + ')'}</p>
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