import React, {useState, useEffect, useRef, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import Input from '../../components/Input'
import useOutsideClick from '../../hooks/useOutsideClick'
import Initials from '../../components/Initials'
import style from '../../assets/scss/inviteMembers.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'

const InviteMembers = ({currentBoard}) => {
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const [show, setShow] = useState(false)
    const [showDropList, setShowDropList] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [dropMemberList, setDropMemberList] = useState([])
    const [selectedToBeInvited, setSelectedToBeInvited] = useState([])
    const [select, setSelect] = useState(false)
        // console.log(currentBoard.invitedMembers)
    // const [usersNotPresentOnBoard, setUsersNotPresentOnBoard] = useState(users
    //     .filter(member => member.id !== user.id)
    //     .filter(member => !currentBoard.invitedMembers.includes(member)))
    const [usersNotPresentOnBoard, setUsersNotPresentOnBoard] = useState(users)

    const ref = useOutsideClick(() => {
        setShow(false)
        setSearchTerm('')
        setDropMemberList([])
        setSelectedToBeInvited([])
        setShowDropList(false)
        setUsersNotPresentOnBoard(users)
    })

    useEffect(() => {
        const list = 
            usersNotPresentOnBoard.filter((member) => {
                if (searchTerm) {
                    if (((member.firstName.toLowerCase()+member.lastName.toLowerCase()).includes(searchTerm.toLowerCase()) 
                    || (member.email.includes(searchTerm)))) {
                        return member
                    }
                }
            })
        setDropMemberList(list)
    }, [searchTerm])
    
    const selectMember = (e, member) => {
        e.stopPropagation()
        setUsersNotPresentOnBoard(prevArr => {
            let newArr = prevArr.filter((mem) => mem.id !== member.id)
            return newArr
        })
        setShowDropList(false)
        setSearchTerm('')
        setSelectedToBeInvited(prevArr => {
            return [...prevArr, member]
        })
        setShow(true) 
    }

    const cancelToInvite = (e, member) => {
        e.stopPropagation()
        setSelectedToBeInvited(prevArr => {
            let newArr = prevArr.filter((mem) => mem.id !== member.id)
            return newArr
        })
        setUsersNotPresentOnBoard(prevArr => {
            return [...prevArr, member]
        })
    }

    const inviteMembers = (e) => {
        e.stopPropagation()

        selectedToBeInvited && 
            selectedToBeInvited.map(async(member) => {
                const docRef = doc(db, 'boards', currentBoard.id)
                await updateDoc(docRef, {
                    invitedMembers: [...currentBoard.invitedMembers, member.id],
                })

                const docMemberRef = doc(db, 'users', member.id)
                await updateDoc(docMemberRef, {
                    guestBoards: [...member.guestBoards, currentBoard.id],
                })
            })
        setSelectedToBeInvited([])
    }

    return (
        <>
            <div 
                className={style.headMenu} 
                style={{marginRight: 'auto', cursor:'pointer'}}
                onClick={(e) => {setShow(prev => !prev); e.stopPropagation()}}>
                Invite members
            </div>
            {show && (
                <div className={style.inviteMembersWindow} ref={ref}>
                    <div className={styles.title}>
                        <span className={styles.titleName} style={{fontSize:'20px', marginBottom: '20px'}}>
                            Invite new members 
                        </span>
                        <span
                            className={styles.closeForm} 
                            onClick={() => setShow(false)}> 
                            × 
                        </span>
                    </div>
                    {selectedToBeInvited.length > 0 &&
                        <div className={style.invitationForm}>
                            <div className={style.membersToInvite}>
                                {selectedToBeInvited.map((member) => (
                                    <div className={style.memberToInvite}>
                                        <span>{member.firstName + ' ' + member.lastName}</span>
                                        <span
                                            className={style.closeMemberToInvite} 
                                            onClick={(e) => cancelToInvite(e, member)}> 
                                            × 
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button className={style.inviteButton} 
                                onClick={(e) => inviteMembers(e)}>
                                Invite
                            </button>
                        </div>
                    }
                    <Input
                        type={'text'}
                        placeholder={'Enter name or email address'}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setShowDropList(true)
                        }}
                    />
                    <div className={style.dropmembersList}>
                        {showDropList && 
                            ((dropMemberList.length > 0) ? 
                            dropMemberList.map((member) => (
                                <div className={style.dropMember} onClick={(e) => selectMember(e,member)}>
                                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                        <Initials user={member} />
                                        {member.firstName + ' ' + member.lastName}
                                        <span style={{marginLeft:'15px',color:'#666'}}>{member.email}</span>
                                    </div>
                                </div>
                            )): null)
                        }
                        {showDropList && 
                            ((dropMemberList.length === 0 && searchTerm !== '') ? 
                                (<div style={{padding:'20px'}}>
                                    Looks like that person isn't a member of ProMBoard yet. 
                                    Add their email address to send an invitation. 
                                </div>):null)
                        }
                    </div>
                    <hr className={styles.line} />
                    <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Members of this board</p>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                        <Initials user={user} />
                        {user.firstName + ' ' + user.lastName}
                        <span style={{marginLeft:'20px',color:'#666'}}>owner</span>
                    </div>
                    {currentBoard.invitedMembers.length 
                        ? currentBoard.invitedMembers.map((memberID, id) => {
                            const currentMember = users.find(user => user.id === memberID)
                            return (
                                <div style={{display:'flex', alignItems:'center', gap:'10px', marginTop:'4px'}}>
                                    <Initials user={currentMember} />
                                    {currentMember.firstName + ' ' + currentMember.lastName}
                                </div>)
                        })
                        : null
                    }                
                </div>
            )}
        </>
    )
}

export default InviteMembers