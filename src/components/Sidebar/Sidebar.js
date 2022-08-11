import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'

import { TickDown } from '../../assets/svg/svg-icons'
import style from '../../assets/scss/sidebar.module.scss'

const Sidebar = () => {
    const [showYourBoards, setShowYourBoards] = useState(true)
    const [showGuestBoards, setShowGuestBoards] = useState(true)
    const [toggleClick, setToggleClick] = useState(true)
    const [changeTick, setChangeTick] = useState(style.tickLeft)
    // const [toggleClickUpDownPers, setToggleClickUpDownPers] = useState(true)
    const [tickUpDownPers, setTickUpDownPers] = useState(style.TickDown)
    // const [toggleClickUpDownGuest, setToggleClickUpDownGuest] = useState(true)
    const [tickUpDownGuest, setTickUpDownGuest] = useState(style.TickDown)
    const boards = useSelector(personalBoardsState)
    let navigate = useNavigate()
    
    useEffect(() => {
        setChangeTick(toggleClick ? style.tickLeft : style.tickRight)
    }, [toggleClick])

    useEffect(() => {
        setTickUpDownPers(showYourBoards ? style.tickDown : style.tickUp)
    }, [showYourBoards])

    useEffect(() => {
        setTickUpDownGuest(showGuestBoards ? style.tickDown : style.tickUp)
    }, [showGuestBoards])   

    const navigateBoard = (title) => {
        navigate('/auth/board/' + title)
    }

    return (
        <>
            {toggleClick && (
                <div className={style.wrapper}>
                    <div className={`${changeTick}`} onClick={() => setToggleClick(prev => !prev)}>
                        <TickDown />
                    </div>
                    <div className={style.dropBoards}>
                        Boards
                    </div>
                    <div className={style.dropBoards}>
                        Members <span className={style.plus}>+</span>
                    </div>
                    {showYourBoards && (
                        <div className={style.dropBoards} onClick={() => setShowYourBoards(prev => !prev)}>
                            Your boards 
                            <span className={`${tickUpDownPers}`}><TickDown /></span>
                        </div>
                    )}
                    {!showYourBoards && (
                        <div>
                            <div className={style.dropBoards} onClick={() => setShowYourBoards(prev => !prev)}>
                                Your boards 
                                <span className={`${tickUpDownPers}`}><TickDown /></span>
                            </div>
                            {boards 
                                && boards.map((board, id) => 
                                    <div key={id} className={style.listItem} onClick={() => navigateBoard(board.boardTitle)}>
                                        <div className={style.colorBoard} style={{backgroundColor: `${board.boardColor}`}}></div>
                                        {board.boardTitle}
                                    </div>
                            )}
                        </div>
                    )}
                    <div className={style.dropBoards} onClick={() => setShowGuestBoards(prev => !prev)}>
                        Guest boards <TickDown />
                    </div>
                </div>
            )}
            {!toggleClick && (
                <div className={style.wrapperHidden} onClick={() => setToggleClick(prev => !prev)}>
                    <div className={`${changeTick}`} >
                        <TickDown />
                    </div>
                </div>    
            )}
        </>
    )
}

export default Sidebar