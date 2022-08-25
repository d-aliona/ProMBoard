import React, { useState, useEffect, useRef } from 'react'

import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/card.module.scss'

const CardSidebar = ({card}) => {
    const [clickDescription, setClickDescription] = useState(false)
    const [description, setDescription] = useState(card.description)

    // const updateCardDescription = async (e) => {
    //     const docRef = doc(db, 'cards', card.id)
                
    //     await updateDoc(docRef, {
    //         description: refInput.current.value,
    //     })
    //     setClickDescription(false)
    //     refInput.current = null
    // }

    // const refInput = useOutsideClick(updateCardDescription)

    // const handleInputDescription = (e) => {
    //     e.stopPropagation()
    //     setClickDescription(true)
    //     refInput.current.style.border = '2px solid rgba(23, 43, 77, .7)'
    // }

    // const cancel = (e) => {
    //     e.stopPropagation()
    //     setClickDescription(false)
    // }
    
    return (
        <div className={style.sidebar}>
            <div >Add to card</div>
            <div className={style.sidebarItem}><div className={style.membersicon}></div> Members</div>
            <div className={style.sidebarItem}><div className={style.covericon}></div>Cover</div>
            <div style={{marginTop:'30px'}}>Actions</div>
            <div className={style.sidebarItem}><div className={style.moveicon}></div>Move</div>
            <div className={style.sidebarItem}><div className={style.copyicon}></div>Copy</div>
            <div className={style.sidebarItem}><div className={style.deleteicon}></div>Delete</div>
        </div>
    )
}

export default CardSidebar