import React  from 'react'
import {  useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import {addNotificationToDataBase} from '../exportFunctions'
import Initials from '../../ui/Initials'
import CloseButton from '../../ui/CloseButton'
import useOutsideClick from '../../hooks/useOutsideClick'

import style from '../../assets/scss/deleteForm.module.scss'

const DeleteMemberFromCardForm = ({card, memberID, currentMember, setShowDeleteMemberForm}) => {
    const user = useSelector((state) => state.user.user)

    const ref = useOutsideClick(() => {
        setShowDeleteMemberForm(false)
    })

    const removeMember = async(e) => {
        e.stopPropagation()
        setShowDeleteMemberForm(false)

        const data = [...card.assignedUsers]
        const changedData = data.filter((id) => id !== memberID)

        const docRef = doc(db, 'cards', card.id)
        await updateDoc(docRef, {
            assignedUsers: [...changedData],
        })
        addNotificationToDataBase(memberID, user.id, 'removed you from this card', card.id, card.boardID)
    }

    return (
        <> 
            <div className={style.deleteMemberOnCardForm} ref={ref}>
                <div className={style.memberInfo}>
                    <Initials user={currentMember} />
                    <div>
                        <p>{currentMember.firstName + ' ' + currentMember.lastName}</p>
                        <p>{currentMember.email}</p>
                    </div>
                    <div style={{position:'absolute', right:'0px', top:'0px'}}>
                        <CloseButton border={'1px solid transparent'} onClick={(e) => {e.stopPropagation(); setShowDeleteMemberForm(false)}}/>
                    </div>
                </div>
                <hr className={style.line} />
                <div className={style.removeMember} onClick={(e) => removeMember(e)}>
                    Remove from card
                </div>
            </div>
        </>
    )
}

export default DeleteMemberFromCardForm