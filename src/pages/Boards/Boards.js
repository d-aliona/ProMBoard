import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import OneBoardOnBoards from '../../components/OneBoardOnBoards'
import CreateBoardForm from '../../features/CreateBoardForm'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { notPersonalBoardsState } from '../../store/slices/notPersonalBoardsSlice'
import ViewClosedBoards from '../../features/ViewClosedBoards'
import style from '../../assets/scss/home.module.scss'

const Boards = () => {
  const user = useSelector((state) => state.user.user)
  const [showCreateBoardForm, setShowCreateBoardForm] = useState(false)
  const [showViewClosedBoards, setShowViewClosedBoards] = useState(false)
  const boards = useSelector(personalBoardsState)
  const notUserBoards = useSelector(notPersonalBoardsState)
  const guestBoards = notUserBoards && notUserBoards.length > 0 ? notUserBoards.filter((board) => board.invitedMembers.includes(user.id)): []
  let navigate = useNavigate()

  const handleClickBoard = (e, id) => {
    e.stopPropagation();
    // e.preventDefault();
    navigate('/auth/board/' + id)
  }
  return (
    <>
      <div className={style.head}>
        <p className={style.title}>
          Boards  
        </p>
        <div className={style.createBoard} onClick={(e) => {setShowCreateBoardForm(prev => !prev); e.stopPropagation()}}>
          Create your board
        </div>
        <div className={style.viewClosedBoards} 
            onClick={(e) => {setShowViewClosedBoards(prev => !prev); e.stopPropagation()}}>
          View closed boards
        </div>
      </div>
      {showCreateBoardForm && (
        <div >
            <CreateBoardForm setShowCreateBoardForm={setShowCreateBoardForm}/>
        </div>
      )}
      {showViewClosedBoards && (
        <div >
            <ViewClosedBoards setShowViewClosedBoards={setShowViewClosedBoards}/>
        </div>
      )}
      <div className={style.line1}></div>
      {/* <hr className={style.line} style={{width:'60%'}}/> */}
      <div className={style.boardsGroup}>
        <h2 className={style.boardgroupTitle}>Personal boards</h2>
        <div className={style.boards} >
          {boards 
            && boards.map((board) => 
            <OneBoardOnBoards key={board.id} board={board} />
          )}
          {boards.length === 0 &&
            <div style={{fontSize:'16px'}}>
              You have no personal boards  
            </div>}
        </div>
      </div>
      {/* <hr className={style.line} style={{width:'100%'}}/> */}
      <div className={style.boardsGroup}>
        <h2 className={style.boardgroupTitle}>Guest boards</h2>
        <div className={style.boards} style={{maxHeight:'20vh'}}>
          {guestBoards 
            && guestBoards.map((board) => 
            <div className={style.boardWrapper}
              style={{backgroundColor: board.boardColor}} 
              onClick={(e) => handleClickBoard(e, board.id)}>
              <div style={{padding:'0 10px' }}>
                  <span className={style.hoverTitle}> {board.boardTitle} </span> 
              </div>    
            </div>)}
          {guestBoards.length === 0 &&
            <div style={{fontSize:'16px'}}>
              You have no guest boards  
            </div>}
        </div>
      </div>  
    </>
  )
}

export default Boards
