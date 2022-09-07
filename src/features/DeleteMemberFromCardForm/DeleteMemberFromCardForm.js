import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import Initials from '../../components/Initials'
import useOutsideClick from '../../hooks/useOutsideClick'
import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'

// import style from '../../assets/scss/card.module.scss'
import style from '../../assets/scss/deleteForm.module.scss'

const DeleteMemberFromCardForm = ({card, memberID, currentMember, setShowDeleteMemberForm}) => {
    const users = useSelector((state) => state.users.users)
    
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
                    
                </div>
                <div
                    className={style.closeMemberOnCardForm} 
                    onClick={(e) => {e.stopPropagation(); setShowDeleteMemberForm(false)}}
                    > 
                    × 
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