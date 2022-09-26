import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import {addNotificationToDataBase} from '../../features/exportFunctions'
import ViewMembersPopup from '../../components/ViewMembers/ViewMembersPopup'
import InviteMembersPopup from '../../features/InviteMembers/InviteMembersPopup'
import style from '../../assets/scss/sidebar.module.scss'
import ChangeBackgroundBoardForm from '../../features/ChangeBackgroundBoardForm/ChangeBackgroundBoardForm'

const DropBoardMenu = ({board, setShowDropMenu, setClickBoardTitle, isOnBoards}) => {
    const user = useSelector((state) => state.user.user)
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
            if (board.invitedMembers.length > 0) {
                board.invitedMembers.forEach(mem => {
                    const ob = {
                        memberID: mem, 
                        userID: user.id, 
                        text: 'closed this board',
                        boardID: board.id,
                        boardTitle: board.boardTitle, 
                        boardColor: board.boardColor, 
                    }
                    addNotificationToDataBase(ob)
                })
            }
            setShowDropMenu(false)
            if (!isOnBoards) {
                navigate('/auth/home')
            }
        })
    }
        
    return (
        <div 
            style={{backgroundColor: isOnBoards ? 'rgba(23, 43, 77, 0)' : 'rgba(23, 43, 77, .3)',
            borderRadius: isOnBoards ? '3px 3px 0 0' : '0 3px 3px 0'}}>
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
                    setShowDropMenu={setShowDropMenu}
                    isOnBoards={isOnBoards}/>
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