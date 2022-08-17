import React, {useState, useEffect, useRef} from 'react'
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

const Board = () => {
  const dispatch = useDispatch()
  const title = useParams()
  const user = useSelector((state) => state.user.user)
  const boards = useSelector(personalBoardsState)
  const lists = useSelector(currentListsState)
  const currentBoard = boards.find(ob => ob.boardTitle === title.id && ob.owner === user.id)
  const sortedLists = [...lists].sort((a,b) => a.position - b.position)
  const boardColor = useBoardColor(title)
  console.log(title.id)
  console.log(boardColor)
  const dragItem = useRef()
  const dragOverItem = useRef()
  
  const dragStart = (e, position) => {
    dragItem.current = position
    
    setTimeout(function(){
      e.target.style.visibility = "hidden"
    }, 0)
    // e.target.style.transform = 'translateX(-9999px)'
    // console.log(e.target.innerHTML)
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position
    // e.target.style.visibility = "hidden"
    // console.log(e.target.innerHTML)
  };

  const dragOver = (e, position) => {
    e.preventDefault();
    // e.target.style.border = '2px solid red'
    
  }

  const dragLeave = (e, position) => {
    // e.target.style.background = ''
    // e.target.style.border = 'none'
    // e.target.style.visibility = "visible"
  }

  const drag = (e, position) => {
    
  }
 
  const drop = (e) => {
    e.preventDefault();
    e.target.style.visibility = "visible"
    // e.target.style.border = 'none'
    const copyListItems = [...sortedLists];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
        
    copyListItems && 
      copyListItems.map(async (list, index) => {
        const docRef = doc(db, 'lists', list.id)
                
        await updateDoc(docRef, {
          position: parseInt(index) + 1,
        })
      })
  }

  const chooseLight = (e) => {
    e.preventDefault()

  }

  const chooseDark = (e) => {
    e.preventDefault()
      
  }

  // const hex2rgba = (hex, alpha = 1) => {
  //   const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  //   return `rgba(${r},${g},${b},${alpha})`;
  // }

  // console.log(hex2rgba(boardColor))

  return (
    <div className={style.wrapper} style={{backgroundColor: `${boardColor}`, opacity: '0.5'}}>
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
                <div className={style.listBackground}>
                  <div key={index} 
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragOver={(e) => dragOver(e, index)}
                    onDragLeave={(e) => dragLeave(e, index)}
                    onDrag={(e) => drag(e, index)}
                    onDragEnd={(e) => drop(e)}
                    draggable={true}>
                    <List  list={list} curBoardId={currentBoard.id} />
                  </div>
                </div>
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
