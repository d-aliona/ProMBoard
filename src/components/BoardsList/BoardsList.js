import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import style from '../../assets/scss/boardsList.module.scss'
import { TickDown } from '../../assets/svg/svg-icons'
import useOutsideClick from '../../hooks/useOutsideClick'

const BoardsList = () => {
    const boards = useSelector(personalBoardsState)
    const [show, setShow] = useState(false)
    const ref = useOutsideClick(() => setShow(false))
    let navigate = useNavigate()
    
    const navigateBoard = (boardID) => {
        navigate('/auth/board/' + boardID)
        setShow(false)
    }

    const toggle = (e) => {
        setShow(prev => !prev)
        e.stopPropagation()
    }
    
    return (
        <>
            <div style={{position: 'relative'}}>
                <div className={style.head} onClick={toggle}>
                    Boards <TickDown />
                </div>
                {show && (
                    <div className={style.dropBoardsList} ref={ref}>
                        <div className={style.title}>
                            <span className={style.titleName}>Your boards</span>
                            <span
                                className={style.closeForm} 
                                onClick={() => setShow(false)}> 
                                × 
                            </span>
                        </div>
                        <hr className={style.line} />
                        <p className={style.boardsGroup}>Personal boards</p>
                            {boards 
                                && boards.map((board, id) => 
                                    <div key={id} className={style.listItem} onClick={() => navigateBoard(board.id)}>
                                        {board.boardTitle}
                                    </div>
                            )}
                        <hr className={style.line} />
                        <p className={style.boardsGroup}>Guest boards</p>
                    </div>
                )}        
            </div>
        </>
    )
}

export default BoardsList