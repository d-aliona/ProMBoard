import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, orderBy, doc, query, onSnapshot, where, updateDoc } from 'firebase/firestore'
import { db, usersCollection } from '../../firebase-client'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import Input from '../../components/Input'
import useOutsideClick from '../../hooks/useOutsideClick'
import Initials from '../../components/Initials'
import { currentCardsState } from '../../store/slices/currentCardsSlice'
import style from '../../assets/scss/inviteMembers.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'

const AssignMemberForm = ({card, setClickAddMembers}) => {
    const users = useSelector((state) => state.users.users)
    const boards = useSelector(personalBoardsState)
    const [searchMember, setSearchMember] = useState('')
    const [isSuccessfulSend , setIsSuccessfulSend ] = useState(false)
    const currentBoard = boards.find(ob => ob.id === card.boardID)
    const membersToBeAssigned = [...currentBoard.invitedMembers, currentBoard.owner]

    const ref = useOutsideClick(() => {
        setClickAddMembers(false)
        setSearchMember('')
        // setDropMemberList([])
        // setSelectedToBeInvited([])
        // setShowDropList(false)
        setIsSuccessfulSend(false)
    })


    const toggleAssignMember = async(e, memberID) => {
        e.stopPropagation()

        if (card.assignedUsers.includes(memberID)) {
            const data = [...card.assignedUsers]
            const changedData = data.filter((id) => id !== memberID)

            const docRef = doc(db, 'cards', card.id)
            await updateDoc(docRef, {
                assignedUsers: [...changedData],
            })
        } else {
            const docRef = doc(db, 'cards', card.id)
            await updateDoc(docRef, {
                assignedUsers: [...card.assignedUsers, memberID],
            })
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
                        onClick={() => setClickAddMembers(false)}> 
                        × 
                    </span>
                </div>
                <hr className={styles.line} />
                <Input
                    type={'text'}
                    placeholder={'Search member'}
                    value={searchMember}
                    onChange={(e) => {
                        setSearchMember(e.target.value)
                        // setShowDropList(true)
                        setIsSuccessfulSend(false)
                    }}
                />
                <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Board members</p>
                <div>
                    {membersToBeAssigned &&
                        membersToBeAssigned.map((memberID) => {
                            const currentMember = users.find(user => user.id === memberID)
                            return (
                                <div className={style.memberToAssign}
                                    onClick={(e) => toggleAssignMember(e, memberID)}>
                                    <Initials user={currentMember} />
                                    {currentMember.firstName + ' ' + currentMember.lastName}
                                    <span style={{marginLeft:'15px',color:'#666'}}>{currentMember.email}</span>
                                    {card.assignedUsers.includes(memberID) 
                                        ? (<span style={{marginLeft:'auto'}}>✓</span>)
                                        : null}
                                </div>)
                        }
                            // <div className={style.dropMember} onClick={(e) => assignMember(e,member)}>
                            //     <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            //         <Initials user={member} />
                            //         {member.firstName + ' ' + member.lastName}
                            //         <span style={{marginLeft:'15px',color:'#666'}}>{member.email}</span>
                            //     </div>
                            // </div>
                        )}
                    {/* {showDropList && 
                        ((dropMemberList.length > 0) ? 
                        dropMemberList.map((member) => (
                            <div className={style.dropMember} onClick={(e) => assignMember(e,member)}>
                                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                    <Initials user={member} />
                                    {member.firstName + ' ' + member.lastName}
                                    <span style={{marginLeft:'15px',color:'#666'}}>{member.email}</span>
                                </div>
                            </div>
                        )): null)
                    } */}
                    {/* {showDropList && 
                        ((dropMemberList.length === 0 && searchTerm !== '') ? 
                            (<div style={{padding:'20px'}}>
                                Looks like that person isn't a member of ProMBoard yet. 
                                Add their email address to send an invitation. 
                            </div>):null)
                    }
                    {isSuccessfulSend &&
                        (<div style={{padding:'20px'}}>
                            The invitation to the specified email has been sent.
                        </div>)
                    } */}
                </div>
                {/* {showDropList && 
                        ((dropMemberList.length === 0 && searchTerm.includes('@')) 
                            ? (<div style={{display:'flex', justifyContent:'center'}}>
                                <form className="contact-form" onSubmit={sendEmail}>
                                    <input style={{display:'none'}} name='name' value={user.firstName + ' ' + user.lastName} readOnly/>
                                    <input style={{display:'none'}} name='email' value={searchTerm} readOnly/>
                                    <input className={`${style.sendInvitationButton} ${disabled}`}
                                        type="submit" 
                                        value='Send an invitation' />
                                </form>
                                </div>)
                            :null)
                } */}
                
                {/* <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Members of this board</p> */}
                {/* <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <Initials user={user} />
                    {currentOwner.firstName + ' ' + currentOwner.lastName}
                    <span style={{marginLeft:'15px',color:'#666'}}>{currentOwner.email}</span>
                    <span style={{marginLeft:'20px',color:'#333'}}>(owner)</span>
                </div> */}
                {/* {currentBoard.invitedMembers.length 
                    ? currentBoard.invitedMembers.map((memberID, id) => {
                        const currentMember = users.find(user => user.id === memberID)
                        return (
                            <div style={{display:'flex', alignItems:'center', gap:'10px', marginTop:'4px'}}>
                                <Initials user={currentMember} />
                                {currentMember.firstName + ' ' + currentMember.lastName}
                                <span style={{marginLeft:'15px',color:'#666'}}>{currentMember.email}</span>
                            </div>)
                    })
                    : null
                }                 */}
            </div>     
        </div>
    </>
  )
}

export default AssignMemberForm