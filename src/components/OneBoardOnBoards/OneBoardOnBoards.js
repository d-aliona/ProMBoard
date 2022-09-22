import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import useOutsideClick from '../../hooks/useOutsideClick'
import ShortenTitle from '../../ui/ShortenTitle'
import DropBoardMenu from '../../features/DropBoardMenu'
import styles from '../../assets/scss/home.module.scss'

const OneBoardOnBoards = ({board}) => {
    const [showMenu, setShowMenu] = useState(false)
    const [showDropMenu, setShowDropMenu] = useState(false)
    const [boardtitle, setBoardtitle] = useState(board.boardTitle)
    const [clickBoardTitle, setClickBoardTitle] = useState(false)
    const [needToRename, setNeedToRename] = useState(false)
    const [coordY, setCoordY] = useState(0)
    const boards = useSelector(personalBoardsState)
    const title = useParams()
    let navigate = useNavigate()
    
    const ref = useOutsideClick(() => {
        setShowDropMenu(false) 
    })

    const handleClickBoard = (e, id) => {
        // e.stopPropagation()
        e.preventDefault()
        navigate('/auth/board/' + id)
    }

    useEffect(() => {
        if (needToRename) {
          updateBoardTitle(board.id)
        }
      },[needToRename])

    const refInput = useOutsideClick(() => setNeedToRename(true))

    const updateBoardTitle = async (boardID) => {
        refInput.current.placeholder = ''
        
        if (refInput.current.value === '') {
            refInput.current.style.border = '2px solid red'
            refInput.current.placeholder = 'There should be a title'
            setNeedToRename(false)
        } else if (boards.some(el => el.boardTitle === refInput.current.value) 
          && board.boardTitle !== refInput.current.value) {
          refInput.current.style.border = '2px solid red'
          refInput.current.value = ''
          setBoardtitle('')
          refInput.current.placeholder = 'Such board already exists'
          setNeedToRename(false)  
        } else {
            const docRef = doc(db, 'boards', boardID)
            await updateDoc(docRef, {
                boardTitle: refInput.current.value,
            })
    
            setClickBoardTitle(false)
            setNeedToRename(false)
            refInput.current = null
            navigate('/auth/board/' + board.id)
        }
    }

    const handleEnterKey = (e) => {
        if (e.code === 'Enter') {
          e.preventDefault()
          setNeedToRename(true)
        }
    }
        
    return (
        <div className={styles.boardWrapper}
            style={{backgroundColor: board.boardColor}} 
            onClick={!clickBoardTitle && !showDropMenu ? (e) => handleClickBoard(e, board.id) : undefined}>
            <div style={{padding:'0 10px' }}>
                {clickBoardTitle 
                    ? <textarea 
                        ref={refInput}
                        type='text'
                        className={styles.titleInput}
                        value={boardtitle}
                        autoFocus
                        onChange={(e) => setBoardtitle(e.target.value)}
                        onKeyDown={(e) => handleEnterKey(e)}
                    ></textarea>
                    :   <span className={styles.hoverTitle}> {board.boardTitle} </span> 
                }
            </div>    
            <div className={styles.dropupMenu} 
                style={{boxShadow: showDropMenu ? '0px 0px 10px 4px rgba(9, 30, 66, .6)' : null}}>
                <div className={styles.threeDots} ref={ref}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        setShowDropMenu(prev => !prev); 
                        setCoordY(e.clientY - 180)}}>
                    •••
                </div>
                {showDropMenu && 
                    <div className={styles.boardDropMenuBackGround} 
                        style={{backgroundColor: board.boardColor, top: coordY}}
                        >
                            <DropBoardMenu 
                                board={board} 
                                setShowDropMenu={setShowDropMenu}
                                setClickBoardTitle={setClickBoardTitle}
                                isOnBoards={true}
                            />
                    </div>
                    } 
            </div>
        </div>
    )
}

export default OneBoardOnBoards