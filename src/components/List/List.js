import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { collection, orderBy, where, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import Cards from '../Cards'
import AddCardForm from '../../features/AddCardForm'
import style from '../../assets/scss/list.module.scss'
import DropListMenu from '../../features/DropListMenu'


const List = ({ list, curBoardId }) => {
    const dispatch = useDispatch()
    const ref = useRef()
    const refListMenu = useRef()
    const [showMenu, setShowMenu] = useState(false)
    
    const toggle = (e) => {
        e.preventDefault()
        setShowMenu(prev => prev === true ? false : true)
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {

            if (showMenu && ref.current && !ref.current.contains(e.target) && !refListMenu.current.contains(e.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickedOutside)

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [showMenu])
    
    return (
        <> 
            <div className={style.listWrapper}>
                <div className={style.listHeader}>
                    <div className={style.listTitle} >
                        {list.listTitle}
                    </div>
                    <div className={style.listMenu} onClick={toggle} ref={refListMenu}>•••</div>
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