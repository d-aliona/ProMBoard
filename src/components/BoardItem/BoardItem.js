import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import useOutsideClick from '../../hooks/useOutsideClick'
import ViewMembersPopup from '../ViewMembers/ViewMembersPopup'
import InviteMembersPopup from '../../features/InviteMembers/InviteMembersPopup'
import style from '../../assets/scss/sidebar.module.scss'

const BoardItem = ({board, refSidebar}) => {
    const [showMenu, setShowMenu] = useState(false)
    const [showDropMenu, setShowDropMenu] = useState(false)
    const [showMembers, setShowMembers] = useState(false)
    const [showInviteMembers, setShowInviteMembers] = useState(false)
    const [boardtitle, setBoardtitle] = useState(board.boardTitle)
    const [clickBoardTitle, setClickBoardTitle] = useState(false)
    const [needToRename, setNeedToRename] = useState(false)
    const [showHint, setShowHint] = useState(false)
    const boards = useSelector(personalBoardsState)
    const title = useParams()
    let navigate = useNavigate()
    const refEl = useRef(null)

    const ref = useOutsideClick(() => {
        setShowDropMenu(false) 
        setShowMembers(false)
        setShowInviteMembers(false)
    })

    const handleClickBoard = (id) => {
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
          && board.boardTitle != refInput.current.value) {
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
        }
    }

    const handleEnterKey = (e) => {
        if (e.code === 'Enter') {
          e.preventDefault()
          setNeedToRename(true)
        }
    }
        
    return (
        <div key={board.id} 
            className={style.boardItem}
            style={{backgroundColor: `${board.id === title.id ? 'rgba(23, 43, 77, .3)' : ''}`}} 
            onClick={() => handleClickBoard(board.id)}
            onMouseOver={() => setShowMenu(true)}
            onMouseOut={() => setShowMenu(false)}
            >
            {clickBoardTitle 
                ? <input 
                    ref={refInput}
                    type='text'
                    style={{borderRadius:'2px', height:'20px', paddingLeft:'4px'}}
                    value={boardtitle}
                    autoFocus
                    onChange={(e) => setBoardtitle(e.target.value)}
                    onKeyUp={(e) => handleEnterKey(e)}
                />
                :   <>
                        <div className={style.colorBoard} style={{backgroundColor: `${board.boardColor}`}}></div>
                        <div style={{height: '32px', lineHeight: '200%', marginRight:'-15px'}} ref={refEl}> 
                            {board.boardTitle.length < 13 
                                ? board.boardTitle
                                :<>
                                    <div 
                                        onMouseOver={() => setShowHint(true)}
                                        onMouseOut={() => setShowHint(false)}>
                                        {board.boardTitle.substr(0,12) + '...'}
                                    </div>
                                    {showHint && <div className={style.hint}>{board.boardTitle}</div> }
                                </> 
                                 
                            }
                        </div>
                    </> 
                }
            <div className={style.threeDots}
                style={{opacity: `${board.id === title.id ? '1' : '0'}`}} 
                onClick={(e) => {e.stopPropagation(); setShowDropMenu(!showDropMenu)}}>
                •••
            </div>
            {showMenu &&
                <div>
                    <div className={style.threeDotsWithoutHover}
                        style={{display: `${board.id === title.id ? 'none' : ''}`}} 
                        >•••
                    </div>
                </div>}
            {showDropMenu && 
                <div className={style.boardDropMenuBackGround} 
                    style={{backgroundColor: board.boardColor, left: refSidebar.current.offsetWidth}}
                    ref={ref}>
                    <div className={style.boardDropMenu}>
                        <div className={style.boardDropItem}
                            onClick={(e) => {e.stopPropagation(); setShowMembers(prev => !prev)}}>
                            View members    
                        </div>
                        {showMembers && (
                            <ViewMembersPopup currentBoard={board} setShowMembers={setShowMembers} />
                        )} 
                        <div className={style.boardDropItem}
                            onClick={(e) => {e.stopPropagation(); setShowInviteMembers(prev => !prev)}}>
                            Invite members    
                        </div> 
                        {showInviteMembers && (
                            <InviteMembersPopup currentBoard={board} setShowInviteMembers={setShowInviteMembers}/>
                        )} 
                        <div className={style.boardDropItem}>
                            Change background    
                        </div> 
                        <div className={style.boardDropItem}
                            onClick={(e) => {e.stopPropagation(); setClickBoardTitle(true); setShowDropMenu(false)}}>
                            Rename board    
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