import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import Cards from '../Cards'
import AddCardForm from '../../features/AddCardForm'
import style from '../../assets/scss/list.module.scss'
import DropListMenu from '../../features/DropListMenu'
import useOutsideClick from '../../hooks/useOutsideClick'

const List = ({ list, curBoardId, draggingCard, setDraggingCard }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [listtitle, setListtitle] = useState(list.listTitle)
    const [clickTitle, setClickTitle] = useState(false)
    const ref = useOutsideClick(() => setShowMenu(false))
    
    const updateListTitle = async (e) => {
        if (refInput.current.value === '') {
            refInput.current.style.border = '2px solid red'
            refInput.current.placeholder = 'There should be a title'
        } else {
            const docRef = doc(db, 'lists', list.id)
                  
            await updateDoc(docRef, {
                listTitle: refInput.current.value,
            })
            setClickTitle(false)
            refInput.current = null
        }
    }

    const refInput = useOutsideClick(updateListTitle)

    const toggle = (e) => {
        setShowMenu(prev => !prev)
        e.stopPropagation()
    }

    const handleListTitle = (e) => {
        e.stopPropagation()
        setClickTitle(true)
        refInput.current.style.border = '2px solid rgba(23, 43, 77, .7)'
    }

    return (
        <> 
            <div className={style.listWrapper}>
                <div className={style.listHeader}>
                    <div className={style.listTitle} onClick={handleListTitle}>
                        {clickTitle ? 
                            <input 
                                ref={refInput}
                                type='text'
                                className={style.inputTitle}
                                value={listtitle}
                                autoFocus
                                onChange={(e) => setListtitle(e.target.value)}
                                />
                            : <span style={{height: '32px', lineHeight: '200%'}}> {list.listTitle} </span>}
                    </div>
                    <div className={style.listMenu} onClick={toggle}>•••</div>
                </div>
                {showMenu && (
                    <div className={style.dropMenu} ref={ref}>
                        <DropListMenu list={list} curBoardId={curBoardId} setShowMenu={setShowMenu} />
                    </div>
                )}
                {/* <div draggable="false"> */}
                    {<Cards 
                        list={list} 
                        curBoardId={curBoardId} 
                        draggingCard={draggingCard} 
                        setDraggingCard={setDraggingCard}/>}
                    <AddCardForm list={list} curBoardId={curBoardId} />
                {/* </div> */}
            </div>
        </>
    )
}

export default List