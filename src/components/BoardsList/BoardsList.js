import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import style from '../../assets/scss/boardsList.module.scss'
import { TickDown } from '../../assets/svg/svg-icons'

const BoardsList = () => {
    const boards = useSelector(personalBoardsState)
    const [show, setShow] = useState(false)
    const ref = useRef()
    let navigate = useNavigate()
    
    useEffect(() => {
        const checkIfClickedOutside = (e) => {

            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside)
        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [show])

    const navigateBoard = (title) => {
        navigate('/auth/board/' + title)
        setShow(false)
    }
    
    return (
        <>
            <div style={{position: 'relative'}}>
                <div className={style.head} onClick={() => setShow(prev => !prev)}>
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
                                    <div key={id} className={style.listItem} onClick={() => navigateBoard(board.boardTitle)}>
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