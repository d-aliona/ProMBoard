import React, {useState} from 'react'

import CreateBoardForm from '../../features/CreateBoardForm'
import ViewClosedBoards from '../../features/ViewClosedBoards'
import style from '../../assets/scss/home.module.scss'

const Boards = () => {
  const [showCreateBoardForm, setShowCreateBoardForm] = useState(false)
  const [showViewClosedBoards, setShowViewClosedBoards] = useState(false)

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
      <hr className={style.line} style={{width:'80%'}}/>
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
    </>
  )
}

export default Boards
