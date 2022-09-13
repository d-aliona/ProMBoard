import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/sidebar.module.scss'
import ViewMembersPopup from '../ViewMembers/ViewMembersPopup'

const BoardItem = ({board}) => {
    const [showMenu, setShowMenu] = useState(false)
    const [showDropMenu, setShowDropMenu] = useState(false)
    const [showMembers, setShowMembers] = useState(false)
    const title = useParams()
    let navigate = useNavigate()
    
    const ref = useOutsideClick(() => {
        setShowDropMenu(false); 
        setShowMembers(false)
    })

    const handleClickBoard = (id) => {
        navigate('/auth/board/' + id)
    }

    return (
        <div key={board.id} 
            className={style.boardItem}
            style={{backgroundColor: `${board.id === title.id ? 'rgba(23, 43, 77, .3)' : ''}`}} 
            onClick={() => handleClickBoard(board.id)}
            onMouseOver={() => setShowMenu(true)}
            onMouseOut={() => setShowMenu(false)}
            >
            <div className={style.colorBoard} style={{backgroundColor: `${board.boardColor}`}}></div>
            {board.boardTitle}
            <div className={style.threeDots}
                style={{opacity: `${board.id === title.id ? '1' : '0'}`}} 
                onClick={(e) => {e.stopPropagation(); setShowDropMenu(!showDropMenu)}}>
                •••
            </div>
            {showMenu &&
                <div>
                    <div className={style.threeDots}
                        style={{display: `${board.id === title.id ? 'none' : ''}`}} 
                        >•••
                    </div>
                </div>}
            {showDropMenu && 
                <div className={style.boardDropMenuBackGround} 
                    style={{backgroundColor: board.boardColor}}
                    ref={ref}>
                    <div className={style.boardDropMenu}>
                        <div className={style.boardDropItem}
                            onClick={(e) => {e.stopPropagation(); setShowMembers(prev => !prev)}}>
                            View members    
                        </div>
                        {showMembers && (
                            <ViewMembersPopup currentBoard={board} setShowMembers={setShowMembers} />
                        )} 
                        <div className={style.boardDropItem}>
                            Invite members    
                        </div>  
                        <div className={style.boardDropItem}>
                            Change background    
                        </div> 
                        <div className={style.boardDropItem}>
                            Close board    
                        </div>   
                    </div>
                </div>
                } 
        </div>
    )
}

export default BoardItem