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

const List = ({ list, curBoardId }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [listtitle, setListtitle] = useState(list.listTitle)
    const [clickTitle, setClickTitle] = useState(false)
    const ref = useOutsideClick(() => setShowMenu(false))
    
    // console.log(listtitle)

    const updateListTitle = async (e) => {
        const docRef = doc(db, 'lists', list.id)
                  
          await updateDoc(docRef, {
            listTitle: listtitle,
          })
        //   setClickTitle(false)
        
    }

    const refInput = useOutsideClick(updateListTitle)

    const toggle = (e) => {
        setShowMenu(prev => !prev)
        e.stopPropagation()
    }

    const handleListTitle = (e) => {
        // e.preventDefault()
        setClickTitle(true)
    }

    // console.log(showMenu)
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
                                defaultValue={listtitle}
                                autoFocus
                                onChange={(e) => setListtitle(e.target.value)}
                                />
                            : <span style={{height: '32px', lineHeight: '200%'}}> {listtitle} </span>}
                    </div>
                    <div className={style.listMenu} onClick={toggle}>•••</div>
                </div>
                {showMenu && (
                    <div className={style.dropMenu} ref={ref}>
                        <DropListMenu list={list} curBoardId={curBoardId} setShowMenu={setShowMenu} />
                    </div>
                )}
                {/* <div draggable="false"> */}
                    {<Cards list={list} curBoardId={curBoardId} />}
                    <AddCardForm list={list} curBoardId={curBoardId} />
                {/* </div> */}
            </div>
        </>
    )
}

export default List