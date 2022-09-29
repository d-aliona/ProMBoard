import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'
import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import AssignMemberForm from '../../features/AssignMemberForm'
import DeleteCardForm from '../../features/DeleteCardForm'
import AddCardCover from '../../features/AddCardCover'
import CopyCard from '../../features/CopyCard'
import MoveCard from '../../features/MoveCard'
import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/card.module.scss'

const CardSidebar = ({card, setClickTitle}) => {
    const [clickDelete, setClickDelete] = useState(false)
    const [clickAddMembers ,setClickAddMembers] = useState(false)
    const [clickAddCover, setClickAddCover] = useState(false)
    const [clickCopyCard, setClickCopyCard] = useState(false)
    const [clickMoveCard, setClickMoveCard] = useState(false)
    
    return (
        <div className={style.sidebar}>
            <div >Add to card</div>
            <div className={style.sidebarItemBorder} >
                <div className={style.sidebarItem}
                    onClick={(e) => {setClickAddMembers(!clickAddMembers); e.stopPropagation()}}>
                    <div className={style.addmembericon}></div> 
                    Members
                </div>
            </div>
            {clickAddMembers && 
                <AssignMemberForm card={card} setClickAddMembers={setClickAddMembers}/>
            }
            <div className={style.sidebarItemBorder} style={{outlineWidth: clickAddCover ? '2px' : '1px'}}>
                <div className={style.sidebarItem} onClick={(e) => {setClickAddCover(prev => !prev); e.stopPropagation()}}>
                    <div className={style.covericon}></div>
                    Cover
                </div>
                {clickAddCover &&
                    <AddCardCover card={card} setClickAddCover={setClickAddCover}/>
                }
            </div>
            <div style={{marginTop:'30px'}}>Actions</div>
            <div className={style.sidebarItemBorder} >
                <div className={style.sidebarItem} 
                    onClick={(e) => {setClickTitle(true); e.stopPropagation()}}>
                    <div className={style.renameicon}></div>
                    Rename
                </div>
            </div>
            <div className={style.sidebarItemBorder} style={{outlineWidth: clickMoveCard ? '2px' : '1px'}}>
                <div className={style.sidebarItem} onClick={(e) => {setClickMoveCard(prev => !prev); e.stopPropagation()}}>
                    <div className={style.moveicon}></div>
                    Move to...
                </div>
                {clickMoveCard &&
                    <MoveCard card={card} setClickMoveCard={setClickMoveCard}/>
                }
            </div>
            <div className={style.sidebarItemBorder} style={{outlineWidth: clickCopyCard ? '2px' : '1px'}}>
                <div className={style.sidebarItem} onClick={(e) => {setClickCopyCard(prev => !prev); e.stopPropagation()}}>
                    <div className={style.copyicon}></div>
                    Copy to...
                </div>
                {clickCopyCard &&
                    <CopyCard card={card} setClickCopyCard={setClickCopyCard}/>
                }
            </div>   
            <div className={style.sidebarItemBorder} >
                <div className={style.sidebarItem} 
                    onClick={(e) => {setClickDelete(!clickDelete); e.stopPropagation()}}>
                    <div className={style.deleteicon}></div>
                    Delete
                </div>
            </div> 
            {clickDelete && 
                <DeleteCardForm card={card} setClickDelete={setClickDelete}/>
            }
        </div>
    )
}

export default CardSidebar