import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import emailjs from '@emailjs/browser'
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase-client'

import {addNotificationToDataBase} from '../../features/exportFunctions'
import Input from '../../components/Input'
import useOutsideClick from '../../hooks/useOutsideClick'
import Initials from '../../components/Initials'
import style from '../../assets/scss/inviteMembers.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'

const InviteMembersPopup = ({ currentBoard, setShowInviteMembers }) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const [show, setShow] = useState(false)
    const [showDropList, setShowDropList] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [dropMemberList, setDropMemberList] = useState([])
    const [selectedToBeInvited, setSelectedToBeInvited] = useState([])
    const [isSuccessfulSend, setIsSuccessfulSend] = useState(false)
    const disabled = searchTerm.match(regex) ? '' : style.disabled
    const [usersNotPresentOnBoard, setUsersNotPresentOnBoard] = useState([])
    const currentOwner = users.find(member => member.id === currentBoard.owner)

    useEffect(() => {
        const filteredUsers = users
            .filter(member => member.id !== user.id)
            .filter(member => !currentBoard.invitedMembers.includes(member.id))
        setUsersNotPresentOnBoard(filteredUsers)
    }, [currentBoard])

    const ref = useOutsideClick(() => {
        setShow(false)
        setSearchTerm('')
        setDropMemberList([])
        setSelectedToBeInvited([])
        setShowDropList(false)
        setIsSuccessfulSend(false)
    })

    useEffect(() => {
        const list =
            usersNotPresentOnBoard.filter((member) => {
                if (searchTerm) {
                    if (((member.firstName.toLowerCase() + member.lastName.toLowerCase()).includes(searchTerm.toLowerCase())
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
        const data = [...selectedToBeInvited]
        const changedData = [...data, member]
        setSelectedToBeInvited(changedData)
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

    const inviteMembers = async (e) => {
        e.stopPropagation()
        const data = [...selectedToBeInvited.map(member => member.id)]
        const docRef = doc(db, 'boards', currentBoard.id)
        await updateDoc(docRef, {
            invitedMembers: [...currentBoard.invitedMembers, ...data],
        })

        selectedToBeInvited &&
            selectedToBeInvited.map(async (member) => {
                const docMemberRef = doc(db, 'users', member.id)
                await updateDoc(docMemberRef, {
                    guestBoards: [...member.guestBoards, currentBoard.id],
                })
                addNotificationToDataBase(member.id, user.id, 'added you to this board', '', currentBoard.id)
            })
        setSelectedToBeInvited([])
    }

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs.sendForm('gmail', 'template_5wbqx98', e.target, 'WNtAQiomd_4bK-q2C')
            .then(() => {
                addDoc(collection(db, 'users'), {
                    email: searchTerm,
                    firstName: '?',
                    lastName: '?',
                    guestBoards: [currentBoard.id],
                })
                    .then((userRef) => {
                        const docRef = doc(db, 'boards', currentBoard.id)
                        updateDoc(docRef, {
                            invitedMembers: [...currentBoard.invitedMembers, userRef.id],
                        })
                        addNotificationToDataBase(userRef.id, user.id, 'added you to this board', '', currentBoard.id)
                    })
                    .then(() => {
                        setSearchTerm('')
                        setShowDropList(false)
                        setIsSuccessfulSend(true)
                    })
            }, (error) => {
                console.log(error.text)
            })
    }

    return (
        <>
            <div
                className={style.headMenu}
                style={{ marginRight: 'auto', cursor: 'pointer' }}
                onClick={(e) => { setShow(prev => !prev); e.stopPropagation() }}>
                Invite members
            </div>
            {show && (
                <div className={style.inviteMembersWindow} ref={ref}>
                    <div className={styles.title}>
                        <span className={styles.titleName}>
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
                                    <div key={member.id} className={style.memberToInvite}>
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
                            setIsSuccessfulSend(false)
                        }}
                    />
                    <div className={style.dropmembersList}>
                        {showDropList &&
                            ((dropMemberList.length > 0) ?
                                dropMemberList.map((member) => (
                                    <div key={member.id}
                                        className={style.dropMember} 
                                        onClick={(e) => selectMember(e, member)}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Initials user={member} />
                                            {member.firstName + ' ' + member.lastName}
                                            <span style={{ marginLeft: '15px', color: '#666' }}>{member.email}</span>
                                        </div>
                                    </div>
                                )) : null)
                        }
                        {showDropList &&
                            ((dropMemberList.length === 0 && searchTerm !== '') ?
                                (<div style={{ padding: '20px' }}>
                                    Looks like that person isn't a member of ProMBoard yet.
                                    Add their email address to send an invitation.
                                </div>) : null)
                        }
                        {isSuccessfulSend &&
                            (<div style={{ padding: '20px' }}>
                                The invitation to the specified email has been sent.
                            </div>)
                        }
                    </div>
                    {showDropList &&
                        ((dropMemberList.length === 0 && searchTerm.includes('@'))
                            ? (<div style={{ display: 'flex', justifyContent: 'center' }}>
                                <form className="contact-form" onSubmit={sendEmail}>
                                    <input style={{ display: 'none' }} name='name' value={user.firstName + ' ' + user.lastName} readOnly />
                                    <input style={{ display: 'none' }} name='email' value={searchTerm} readOnly />
                                    <input className={`${style.sendInvitationButton} ${disabled}`}
                                        type="submit"
                                        value='Send an invitation' />
                                </form>
                            </div>)
                            : null)
                    }
                    <hr className={styles.line} />
                    <p className={styles.boardsGroup} style={{ marginBottom: '10px' }}>Members of this board</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Initials user={user} />
                        {currentOwner.firstName + ' ' + currentOwner.lastName}
                        <span style={{ marginLeft: '15px', color: '#666' }}>{currentOwner.email}</span>
                        <span style={{ marginLeft: '20px', color: '#333' }}>(owner)</span>
                    </div>
                    {currentBoard.invitedMembers.length
                        ? currentBoard.invitedMembers.map((memberID) => {
                            const currentMember = users.find(user => user.id === memberID)
                            return (
                                <div key={memberID} 
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                                    <Initials user={currentMember} />
                                    {currentMember.firstName + ' ' + currentMember.lastName}
                                    <span style={{ marginLeft: '15px', color: '#666' }}>{currentMember.email}</span>
                                </div>)
                        })
                        : null
                    }
                </div>
            )}
        </>
    )
}

export default InviteMembersPopup