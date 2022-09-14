import React, { useState } from 'react'
import InviteMembersPopup from './InviteMembersPopup'
import style from '../../assets/scss/inviteMembers.module.scss'

const InviteMembers = ({ currentBoard }) => {
    const [showInviteMembers, setShowInviteMembers] = useState(false)
        
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