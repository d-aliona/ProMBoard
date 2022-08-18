import React, {useState, useEffect, useRef, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { doc, updateDoc, collection, orderBy, where, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase-client'

import List from '../../components/List'
import AddListForm from '../../features/AddListForm'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { currentListsState } from '../../store/slices/currentListsSlice'
import style from '../../assets/scss/board.module.scss'
import useBoardColor from '../../hooks/useBoardColor'
import MenuContext from '../../context/MenuContext'

const Board = () => {
  const dispatch = useDispatch()
  const title = useParams()
  const user = useSelector((state) => state.user.user)
  const boards = useSelector(personalBoardsState)
  const lists = useSelector(currentListsState)
  const currentBoard = boards.find(ob => ob.boardTitle === title.id && ob.owner === user.id)
  const sortedLists = [...lists].sort((a,b) => a.position - b.position)
  const boardColor = useBoardColor(title)
  const {textColor, setTextColor} = useContext(MenuContext)
  const [draggingList, setDraggingList] = useState(false)
  // console.log(sortedLists)
  
  const dragItemList = useRef()
  const dragItemListNode = useRef()
  
  const handleDragStartList = (e, position) => {
    dragItemList.current = position
    dragItemListNode.current = e.target
    // console.log(dragItemList.current)
    // console.log(dragItemListNode.current)
    dragItemListNode.current.addEventListener('dragend', handleDragEndList)
    
    
    // setTimeout(function(){
    //   e.target.style.visibility = "hidden"
    // }, 0)
    setTimeout(() => {
      setDraggingList(true)
    }, 0)
  }
 
  const handleDragEnterList = (e, position) => {
    e.preventDefault();
    // console.log(dragItemListNode.current)
    // console.log(e.currentTarget)
    if (dragItemListNode.current !== e.target) {
      // console.log('www')
      // e.target.style.visibility = "visible"
      const copyListItems = [...sortedLists]
      copyListItems.splice(position, 0, copyListItems.splice(dragItemList.current, 1)[0])
      // console.log(copyListItems)
      // console.log(position)
      // console.log(dragItemList.current)
      // const dragItemContent = copyListItems[dragItemList.current]
      // copyListItems.splice(dragItemList.current, 1)
      // copyListItems.splice(position, 0, dragItemContent)
      // console.log(copyListItems)
      dragItemList.current = position  

      copyListItems && 
        copyListItems.map(async (list, index) => {
          const docRef = doc(db, 'lists', list.id)
                  
          await updateDoc(docRef, {
            position: parseInt(index) + 1,
          })
        })
    } 
  }

  const handleDragEndList = (e) => {
    e.preventDefault()
    e.target.style.visibility = "visible"
    setDraggingList(false)
    dragItemList.current = null
    dragItemListNode.current.removeEventListener('dragend', handleDragEndList)
    dragItemListNode.current = null
  }

  const getStyles = (position) => {
    if (dragItemList.current === position) {
      return 'style.listBackground'
      
    }
    return ''
  }
 
  // const drop = (e) => {
  //   e.preventDefault();
  //   e.target.style.visibility = "visible"
  //   // e.target.style.border = 'none'
  //   const copyListItems = [...sortedLists];
  //   const dragItemContent = copyListItems[dragItem.current];
  //   copyListItems.splice(dragItem.current, 1);
  //   copyListItems.splice(dragOverItem.current, 0, dragItemContent);
  //   dragItem.current = null;
  //   dragOverItem.current = null;
        
  //   copyListItems && 
  //     copyListItems.map(async (list, index) => {
  //       const docRef = doc(db, 'lists', list.id)
                
  //       await updateDoc(docRef, {
  //         position: parseInt(index) + 1,
  //       })
  //     })
  // }

  const chooseLight = (e) => {
    e.preventDefault()
    setTextColor('white')
  }

  const chooseDark = (e) => {
    e.preventDefault()
    setTextColor('rgb(23, 43, 77)')
  }

  return (
    <div 
      style={{backgroundColor: `${boardColor}cc`, 
      color: `${title.id ? textColor : 'rgb(23, 43, 77)'}`}}>
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
        {sortedLists && 
          sortedLists.map((list, index) => {
            return (
              <>
                {/* <div className={style.listBackground}> */}
                  <div key={index} 
                    onDragStart={(e) => handleDragStartList(e, index)}
                    onDragEnter={draggingList ? (e) => {handleDragEnterList(e, index)}:null}
                    className={draggingList ? getStyles(index): null} 
                    draggable={true}>
                    <List  list={list} curBoardId={currentBoard.id} />
                  </div>
                {/* </div> */}
              </>
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
