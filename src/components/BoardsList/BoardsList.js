import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { notPersonalBoardsState } from '../../store/slices/notPersonalBoardsSlice'
import { TickDown } from '../../assets/svg/svg-icons'
import useOutsideClick from '../../hooks/useOutsideClick'
import CloseButton from '../../ui/CloseButton'
import Line from '../../ui/Line'
import ShortenTitle from '../../ui/ShortenTitle'
import style from '../../assets/scss/boardsList.module.scss'

const BoardsList = () => {
    const user = useSelector((state) => state.user.user)
    const boards = useSelector(personalBoardsState)
    const notUserBoards = useSelector(notPersonalBoardsState)
    const [show, setShow] = useState(false)
    const ref = useOutsideClick(() => setShow(false))
    let navigate = useNavigate()
    
    const guestBoards = notUserBoards && notUserBoards.length > 0 ? notUserBoards.filter((board) => board.invitedMembers.includes(user.id)): []

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
                            <CloseButton onClick={() => setShow(false)}/>
                        </div>
                        <Line width={'96%'}/>
                        <p className={style.boardsGroup}>Personal boards</p>
                        {boards 
                            && boards.map((board) => 
                                <div key={board.id} 
                                    className={style.listItem} 
                                    onClick={() => navigateBoard(board.id)}>
                                    <div className={style.colorBoard} style={{backgroundColor: `${board.boardColor}`}}></div>    
                                    <ShortenTitle title={board.boardTitle} number={40}/>
                                </div>
                        )}
                        <Line width={'90%'}/>
                        <p className={style.boardsGroup}>Guest boards</p>
                        {guestBoards 
                                && guestBoards.map((board) => 
                                    <div key={board.id} 
                                        className={style.listItem} 
                                        onClick={() => navigateBoard(board.id)}>
                                        <div className={style.colorBoard} style={{backgroundColor: `${board.boardColor}`}}></div>    
                                        <ShortenTitle title={board.boardTitle} number={40}/>
                                    </div>
                            )}
                    </div>
                )}        
            </div>
        </>
    )
}

export default BoardsList