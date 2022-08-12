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


const List = ({ list, curBoardId }) => {
    const dispatch = useDispatch()
    const ref = useRef()
    const [showMenu, setShowMenu] = useState(false)

    const toggle = (e) => {
        e.preventDefault()
        setShowMenu(prev => !prev)
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {

            if (showMenu && ref.current && !ref.current.contains(e.target)) {
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
                    <div className={style.listMenu} onClick={toggle}>•••</div>
                </div>
                {showMenu && (
                    <div className={style.dropMenu} ref={ref}>
                        <div className={style.title}>
                            <span className={style.titleName}>List actions</span>
                            <span
                                className={style.closeForm} 
                                onClick={() => {
                                    setShowMenu(false)
                                }}> 
                                × 
                            </span>
                        </div>
                        <hr className={style.line} />
                        <div className={style.menuItem}>Copy list</div>
                        <div className={style.menuItem}>Move list</div>
                        <hr className={style.line} />
                        <div className={style.menuItem}>Move all cards in this list</div>
                        <div className={style.menuItem}>Delete all cards in this list</div>
                        <hr className={style.line} />
                        <div className={style.menuItem}>Delete this list</div>
                    </div>

                )}
                
                {<Cards list={list} curBoardId={curBoardId} />}
                <AddCardForm list={list} curBoardId={curBoardId} />
            </div>
        </>
    )
}

export default List