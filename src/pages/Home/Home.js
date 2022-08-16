import React, {useRef} from 'react'

import CreateBoardForm from '../../features/CreateBoardForm'
import style from '../../assets/scss/home.module.scss'

const Home = () => {
  const createBoard = () => {
    return (
      <CreateBoardForm />
    )
  }

  return (
    <div className={style.wrapper}>
      <p className={style.motto}>
        Stay on track and up to date!  
      </p>
      <p style={{fontSize: '20px'}}>
        Boards are where work gets done.
      </p>
      <hr className={style.line} />
      <div className={style.createBoard} onClick={createBoard}>
        Create your board
      </div>
    </div>
  )
}

export default Home
