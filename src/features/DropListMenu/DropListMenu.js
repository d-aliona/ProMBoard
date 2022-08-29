import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import style from '../../assets/scss/list.module.scss'
import DeleteListForm from '../DeleteListForm'

const DropListMenu = ({list, curBoardId, setShowMenu, setClickTitle}) => {
    const [messageDeleteList, setMessageDeleteList] = useState(false)

    const handleDeleteList = (e) => {
        e.preventDefault()
        setMessageDeleteList(true)
        e.stopPropagation()
    }

    return (
        <>
            <div className={style.title}>
                <span className={style.titleName}>List actions</span>
                <span
                    className={style.closeForm} 
                    onClick={() => {setShowMenu(false)}}> 
                    × 
                </span>
            </div>
            <hr className={style.line} />
            <div className={style.menuItem}
                onClick={(e) => {e.stopPropagation(); setClickTitle(true)}}>
                Rename list</div>
            <div className={style.menuItem}>Copy list</div>
            <div className={style.menuItem}>Move list</div>
            <hr className={style.line} />
            <div className={style.menuItem}>Move all cards in this list</div>
            <div className={style.menuItem}>Delete all cards in this list</div>
            <hr className={style.line} />
            <div className={style.menuItem} onClick={handleDeleteList}>Delete this list</div>
            {messageDeleteList && 
                <DeleteListForm list={list} curBoardId={curBoardId} setShowMenu={setShowMenu}/>
            }
        </>
    )
}

export default DropListMenu
