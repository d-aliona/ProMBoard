import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import List from '../../components/List'
import AddListForm from '../../features/AddListForm'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { currentListsState } from '../../store/slices/currentListsSlice'
import style from '../../assets/scss/board.module.scss'
import GetListState from '../../hoc/GetListState'
import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'

const Board = () => {
  const dispatch = useDispatch()
  const title = useParams()
  // const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const boards = useSelector(personalBoardsState)
  const lists = useSelector(currentListsState)
  const [clickAddList, setClickAddList] = useState(false)
  const currentBoard = boards.find(ob => ob.title === title.id)
  // console.log(lists)
  const chooseLight = (e) => {
    e.preventDefault()

  }

  const chooseDark = (e) => {
    e.preventDefault()
      
  }

  return (
    <div className={style.wrapper}>
      <div className={style.head}>
        <div className={style.title}>
          {title.id}
        </div>
        <div className={style.changeColor}>
          Choose text color: 
          <div className={style.changeColor_light} onClick={chooseLight}>light</div>
          <div className={style.changeColor_dark} onClick={chooseDark}>dark</div>
        </div>
      </div>
      <div className={style.lists}>
        {lists && 
          lists.map((list, key) => {
            dispatch(setCurrentCards(null))
            return (
              <div>
                <GetListState key={key} list={list} curBoardId={currentBoard.id} >
                  <List list={list} curBoardId={currentBoard.id}/>
                </GetListState>
              </div>
            )
          })
        }
        {!!lists.length && 
          <div>
            <AddListForm title={'Add another list'} curBoardId={currentBoard.id} />
          </div>
        }
        {!lists.length && 
          <div>
            <AddListForm title={'Add a list'} curBoardId={currentBoard.id} />
          </div>
        }
      </div>
    </div>
  )
}

export default Board
