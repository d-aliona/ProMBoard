import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { collection, orderBy, doc, query, onSnapshot, where } from 'firebase/firestore'
import { db, auth, usersCollection } from '../../firebase-client'

import List from '../../components/List'
import AddListForm from '../../features/AddListForm'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { setCurrentLists, currentListsState } from '../../store/slices/currentListsSlice'
import style from '../../assets/scss/board.module.scss'

const Board = () => {
  const title = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const boards = useSelector(personalBoardsState)
  const lists = useSelector(currentListsState)
  // console.log(boards)
  const [clickAddList, setClickAddList] = useState(false)
  // console.log(title)
  const currentBoard = boards.find(ob => ob.title === title.id)
  // console.log(currentBoard)
  

  useEffect(() => {
      const docRef = doc(usersCollection, user.id, 'personalBoards', currentBoard.id)
      const listsCol = collection(docRef, 'lists')
      const qLists = query(listsCol, orderBy('order', 'asc'))

      // if (lists.length) {
        onSnapshot(qLists, (snapshot) => {
          const listSnap = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          })
          dispatch(setCurrentLists(listSnap))
        })
      // }
  }, [currentBoard.id])
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
          lists.map((list, id) => {
            return (
              <div>
                <List key={id} list={list} curBoardId={currentBoard.id}/>
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
