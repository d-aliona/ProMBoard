import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { notPersonalBoardsState } from '../../store/slices/notPersonalBoardsSlice'

import useBoardColor from '../../hooks/useBoardColor'
import { TickDown } from '../../assets/svg/svg-icons'
import MenuContext from '../../context/MenuContext'
import style from '../../assets/scss/sidebar.module.scss'

const Sidebar = () => {
    const user = useSelector((state) => state.user.user)
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
    const title = useParams()
    const boardColor = useBoardColor(title)
    const {textColor} = useContext(MenuContext)
    const notUserBoards = useSelector(notPersonalBoardsState)
    const guestBoards = notUserBoards && notUserBoards.length > 0 ? notUserBoards.filter((board) => board.invitedMembers.includes(user.id)): []

    useEffect(() => {
        setChangeTick(toggleClick ? style.tickLeft : style.tickRight)
    }, [toggleClick])

    useEffect(() => {
        setTickUpDownPers(showYourBoards ? style.tickDown : style.tickUp)
    }, [showYourBoards])

    useEffect(() => {
        setTickUpDownGuest(showGuestBoards ? style.tickDown : style.tickUp)
    }, [showGuestBoards])   

    // const navigateBoard = (title) => {
    //     navigate('/auth/board/' + title)
    // }

    const handleClickBoard = (id) => {
        // navigateBoard(board.boardTitle)
        navigate('/auth/board/' + id)
    }

    return (
        <>
            {toggleClick && (
                <div 
                    className={style.wrapper} 
                    style={{backgroundColor: `${title.id ? boardColor : '#f4f5f7' }`,
                    color: `${title.id ? textColor : 'rgb(23, 43, 77)'}`}}>
                    <div className={`${changeTick}`} onClick={() => setToggleClick(prev => !prev)}>
                        <TickDown />
                    </div>
                    <div className={style.dropBoards}>
                        Boards
                    </div>
                    <div className={style.dropBoards}>
                        Members <span className={style.plus}>+</span>
                    </div>
                    <div className={style.dropBoards} onClick={() => setShowYourBoards(prev => !prev)}>
                        Your boards 
                        <span className={`${tickUpDownPers}`}><TickDown /></span>
                    </div>
                    {!showYourBoards && (
                        <div>
                            {boards 
                                && boards.map((board) => 
                                    <div key={board.id} 
                                        className={style.listItem}
                                        style={{backgroundColor: `${board.id === title.id ? 'rgba(23, 43, 77, .3)' : ''}`}} 
                                        onClick={() => handleClickBoard(board.id)}>
                                        <div className={style.colorBoard} style={{backgroundColor: `${board.boardColor}`}}></div>
                                        {board.boardTitle}
                                    </div>)}
                        </div>
                    )}
                    <div className={style.dropBoards} onClick={() => setShowGuestBoards(prev => !prev)}>
                        Guest boards 
                        <span className={`${tickUpDownGuest}`}><TickDown /></span>
                    </div>
                    {!showGuestBoards && (
                        <div>
                            {guestBoards 
                                && guestBoards.map((board) => 
                                    <div key={board.id} 
                                        className={style.listItem}
                                        style={{backgroundColor: `${board.id === title.id ? 'rgba(23, 43, 77, .3)' : ''}`}} 
                                        onClick={() => handleClickBoard(board.id)}>
                                        <div className={style.colorBoard} style={{backgroundColor: `${board.boardColor}`}}></div>
                                        {board.boardTitle}
                                    </div>)}
                        </div>
                    )}
                </div>
            )}
            {!toggleClick && (
                <div className={style.wrapperHidden} 
                    style={{'--backgroundColor': `${title.id ? boardColor : '#f4f5f7' }`, 
                    '--hoverColor': 'rgba(23, 43, 77, .4)'}}
                    onClick={() => setToggleClick(prev => !prev)}>
                    <div className={`${changeTick}`} >
                        <TickDown />
                    </div>
                </div>    
            )}
        </>
    )
}

export default Sidebar