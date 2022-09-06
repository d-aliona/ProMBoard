import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'
import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import AssignMemberForm from '../../features/AssignMemberForm'
import DeleteCardForm from '../../features/DeleteCardForm'
import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/card.module.scss'

const CardSidebar = ({card, setClickTitle}) => {
    const [clickDelete, setClickDelete] = useState(false)
    const [clickAddMembers ,setClickAddMembers] = useState(false)
    
    return (
        <div className={style.sidebar}>
            <div >Add to card</div>
            <div className={style.sidebarItem}
                onClick={(e) => {setClickAddMembers(true); e.stopPropagation()}}>
                <div className={style.addmembericon}></div> 
                Members
            </div>
            {clickAddMembers && 
                <AssignMemberForm card={card} setClickAddMembers={setClickAddMembers}/>
            }
            <div className={style.sidebarItem}><div className={style.covericon}></div>Cover</div>
            <div style={{marginTop:'30px'}}>Actions</div>
            <div className={style.sidebarItem} 
                onClick={(e) => {setClickTitle(true); e.stopPropagation()}}>
                <div className={style.renameicon}></div>
                Rename
            </div>
            <div className={style.sidebarItem}><div className={style.moveicon}></div>Move</div>
            <div className={style.sidebarItem}><div className={style.copyicon}></div>Copy</div>
            <div className={style.sidebarItem} 
                onClick={(e) => {setClickDelete(true); e.stopPropagation()}}>
                <div className={style.deleteicon}></div>
                Delete
            </div>
            {clickDelete && 
                <DeleteCardForm card={card} setClickDelete={setClickDelete}/>
            }
        </div>
    )
}

export default CardSidebar