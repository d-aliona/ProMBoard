import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import ViewMembersPopup from '../../components/ViewMembers/ViewMembersPopup'
import InviteMembersPopup from '../../features/InviteMembers/InviteMembersPopup'
import style from '../../assets/scss/sidebar.module.scss'
import ChangeBackgroundBoardForm from '../../features/ChangeBackgroundBoardForm/ChangeBackgroundBoardForm'

const DropBoardMenu = ({board, setShowDropMenu, setClickBoardTitle}) => {
    const [showMembers, setShowMembers] = useState(false)
    const [showInviteMembers, setShowInviteMembers] = useState(false)
    const [showChangeBackgroundForm, setShowChangeBackgroundForm] = useState(false)
    let navigate = useNavigate()
    
    const closeBoard = () => {
        const docRef = doc(db, 'boards', board.id)
              
        updateDoc(docRef, {
            statusOpened: false,
        })
        .then(() => {
            setShowDropMenu(false)
            navigate('/auth/home')
        })
    }
        
    return (
        <div className={style.boardDropMenu}>
            <div className={style.boardDropItem}
                onClick={(e) => {e.stopPropagation(); setShowMembers(prev => !prev)}}>
                View members    
            </div>
            {showMembers && (
                <ViewMembersPopup currentBoard={board} setShowMembers={setShowMembers} />
            )} 
            <div className={style.boardDropItem}
                onClick={(e) => {e.stopPropagation(); setShowInviteMembers(prev => !prev)}}>
                Invite members    
            </div> 
            {showInviteMembers && (
                <InviteMembersPopup currentBoard={board} setShowInviteMembers={setShowInviteMembers}/>
            )} 
            <div className={style.boardDropItem}
                onClick={(e) => {setShowChangeBackgroundForm(prev => !prev); e.stopPropagation()}}>
                Change background    
            </div> 
            {showChangeBackgroundForm && (
                <ChangeBackgroundBoardForm 
                    board={board} 
                    setShowChangeBackgroundForm={setShowChangeBackgroundForm}
                    setShowDropMenu={setShowDropMenu}/>
            )} 
            <div className={style.boardDropItem}
                onClick={(e) => {e.stopPropagation(); setClickBoardTitle(true); setShowDropMenu(false)}}>
                Rename board    
            </div>
            <div className={style.boardDropItem} 
                onClick={closeBoard}>
                Close board    
            </div>   
        </div>
    )
}

export default DropBoardMenu