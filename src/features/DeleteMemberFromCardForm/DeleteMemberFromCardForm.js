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

const DeleteMemberFromCardForm = ({memberID}) => {
    const users = useSelector((state) => state.users.users)
    const currentMember = users.find(user => user.id === memberID)
    console.log('nono')
    return (
        <> 
            <div>
                {/* <div>
                    <Initials user={currentMember} />
                    <div>
                        <p>{currentMember.firstName + ' ' + currentMember.lastName}</p>
                        <p>{currentMember.email}</p>
                    </div>
                </div>
                <div>Remove from card</div> */}
                bbb
            </div>
        </>
    )
}

export default DeleteMemberFromCardForm