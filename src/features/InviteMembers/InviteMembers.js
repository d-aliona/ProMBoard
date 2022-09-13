import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import emailjs from '@emailjs/browser'
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase-client'

import InviteMembersPopup from './InvitemembersPopup'
import {addNotificationToDataBase} from '../../features/exportFunctions'
import Input from '../../components/Input'
import useOutsideClick from '../../hooks/useOutsideClick'
import Initials from '../../components/Initials'
import style from '../../assets/scss/inviteMembers.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'

const InviteMembers = ({ currentBoard }) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const [showInviteMembers, setShowInviteMembers] = useState(false)
    const [showDropList, setShowDropList] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [dropMemberList, setDropMemberList] = useState([])
    const [selectedToBeInvited, setSelectedToBeInvited] = useState([])
    const [isSuccessfulSend, setIsSuccessfulSend] = useState(false)
    const disabled = searchTerm.match(regex) ? '' : style.disabled
    const [usersNotPresentOnBoard, setUsersNotPresentOnBoard] = useState([])
    const currentOwner = users.find(member => member.id === currentBoard.owner)

    return (
        <>
            <div
                className={style.headMenu}
                style={{ marginRight: 'auto', cursor: 'pointer' }}
                onClick={(e) => { setShowInviteMembers(prev => !prev); e.stopPropagation() }}>
                Invite members
            </div>
            {showInviteMembers && (
                <InviteMembersPopup currentBoard={currentBoard} setShowInviteMembers={setShowInviteMembers}/>
            )}
        </>
    )
}

export default InviteMembers