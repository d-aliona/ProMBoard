import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../firebase-client'

import Input from '../../components/Input'

import style from '../../assets/scss/list.module.scss'
import { ShowPassword, HidePassword } from '../../assets/svg/svg-icons'

const DropListMenu = ({list, curBoardId, setShowMenu}) => {
    

  return (
    <>
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
    </>
    )
}

export default DropListMenu
