import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import Input from '../../components/Input'
import useOutsideClick from '../../hooks/useOutsideClick'
import Initials from '../../components/Initials'
import style from '../../assets/scss/inviteMembers.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'

const AssignMemberForm = ({card, setClickAddMembers}) => {
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const boards = useSelector(personalBoardsState)
    const [searchMember, setSearchMember] = useState('')
    const currentBoard = boards.find(ob => ob.id === card.boardID)
    const membersToBeAssigned = [...currentBoard.invitedMembers, currentBoard.owner]
    const [dropMemberList, setDropMemberList] = useState(membersToBeAssigned)
    const ref = useOutsideClick(() => {
        setClickAddMembers(false)
        setSearchMember('')
    })
    
    useEffect(() => {
        const list = 
            membersToBeAssigned.filter((memberID) => {
                if (searchMember !== '') {
                    const member = users.find(ob => ob.id === memberID)
                    if (searchMember) {
                        if (((member.firstName.toLowerCase()+member.lastName.toLowerCase()).includes(searchMember.toLowerCase()) 
                        || (member.email.includes(searchMember)))) {
                            return member
                        }
                    }
                } else return memberID
            })
        setDropMemberList(list)
    }, [searchMember])

    const changeDataBase = async(memberID, text) => {
        const colRef = collection(db, 'users', memberID, 'notifications')
        
        addDoc(colRef, {
            fromUser: user.id,
            time: new Date().toLocaleString('en-GB'),
            read: false,
            text: text,
            cardID: card.id,
            boardID: card.boardID, 
        })
        .catch((error) => {
            console.error(error.message)
        })

        const docRef = doc(db, 'users', memberID)
        await updateDoc(docRef, {
            newNotificationExist: true,
        }) 
    }

    const toggleAssignMember = async(e, memberID) => {
        e.stopPropagation()

        if (card.assignedUsers.includes(memberID)) {
            const data = [...card.assignedUsers]
            const changedData = data.filter((id) => id !== memberID)

            const docRef = doc(db, 'cards', card.id)
            await updateDoc(docRef, {
                assignedUsers: [...changedData],
            })
            changeDataBase(memberID, 'removed from this card')
        } else {
            const docRef = doc(db, 'cards', card.id)
            await updateDoc(docRef, {
                assignedUsers: [...card.assignedUsers, memberID],
            })
            changeDataBase(memberID, 'added to this card')
        }
    }

  return (
    <>
        <div style={{position:'relative', display:'flex', justifyContent:'center'}}>
            <div className={style.assignMembersWindow} ref={ref}>
                <div className={styles.title}>
                    <span className={styles.titleName} >
                        Assign members 
                    </span>
                    <span
                        className={styles.closeForm} 
                        onClick={(e) => {e.stopPropagation(); setClickAddMembers(false)}}> 
                        × 
                    </span>
                </div>
                <hr className={styles.line} />
                <Input
                    type={'text'}
                    placeholder={'Search member'}
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                />
                <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Board members</p>
                {dropMemberList &&
                    dropMemberList.map((memberID) => {
                        const currentMember = users.find(ob => ob.id === memberID)
                        return (
                            <div className={style.memberToAssign}
                                    onClick={(e) => toggleAssignMember(e, memberID)}>
                                    <Initials user={currentMember} />
                                    {currentMember.firstName + ' ' + currentMember.lastName}
                                    <span style={{marginLeft:'15px',color:'#666'}}>{currentMember.email}</span>
                                    {card.assignedUsers.includes(memberID) 
                                        ? (<span style={{marginLeft:'auto'}}>✓</span>)
                                        : null}
                                </div>
                    )})
                }            
            </div>     
        </div>
    </>
  )
}

export default AssignMemberForm