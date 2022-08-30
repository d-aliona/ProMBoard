import React, {useState, useEffect, useRef, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import List from '../../components/List'
import AddListForm from '../../features/AddListForm'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import style from '../../assets/scss/board.module.scss'
import useBoardColor from '../../hooks/useBoardColor'
import MenuContext from '../../context/MenuContext'
import { setCurrentLists, currentListsState } from '../../store/slices/currentListsSlice'
import { setCurrentCards, currentCardsState } from '../../store/slices/currentCardsSlice'
import { setCurrentDragStartCard, currentDragStartCardState } from '../../store/slices/currentDragStartCardSlice'

const Board = () => {
  const dispatch = useDispatch()
  const title = useParams()
  const user = useSelector((state) => state.user.user)
  const boards = useSelector(personalBoardsState)
  const lists = useSelector(currentListsState)
  const cards = useSelector(currentCardsState)
  const currentDragStartCard = useSelector(currentDragStartCardState)
  const currentBoard = boards.find(ob => ob.id === title.id)
  const boardColor = useBoardColor(title)
  const {textColor, setTextColor} = useContext(MenuContext)
  const [draggingList, setDraggingList] = useState(false)
  const [draggingCard, setDraggingCard] = useState(false)
  const dragItemList = useRef()
  const dragItemListNode = useRef()
  
  let allListsCards = []
  let i = 0

  for (const list of lists) {
    allListsCards.push({list: list, cards: []})

    for (const card of cards) {
      if (card.listID === list.id) {
        allListsCards[i].cards.push(card)
      }
    }
    i++
  }
  allListsCards.sort((a,b) => a.list.position - b.list.position) 
  allListsCards.forEach(el => {el.cards.sort((a,b) => a.position - b.position)})

  const [listsCardsToRender, setListsCardsToRender] = useState(allListsCards)
  
  useEffect(() => {
      setListsCardsToRender(allListsCards);
  }, [lists, cards])

  const handleDragStartList = (e, item) => {
    dragItemList.current = item
    dragItemListNode.current = e.target
    dragItemListNode.current.addEventListener('dragend', handleDragEndList)
       
    setTimeout(function(){
      setDraggingList(true)
    }, 0)
    
  }
 
  const handleDragEnterList = (e, targetItem) => {
    const copyListItems = [...listsCardsToRender]

    if (draggingList) {
      const dragItemContent = copyListItems[dragItemList.current.index]
      copyListItems.splice(dragItemList.current.index, 1)
      copyListItems.splice(targetItem.index, 0, dragItemContent)
      dragItemList.current.index = targetItem.index 
    } else {
      const dragItemContent = copyListItems[currentDragStartCard.listIndex].cards[currentDragStartCard.cardIndex]
      copyListItems[currentDragStartCard.listIndex].cards.splice(currentDragStartCard.cardIndex, 1)
      copyListItems[targetItem.index].cards.splice(0, 0, dragItemContent)
      
      dispatch(setCurrentDragStartCard({
        listIndex: targetItem.index,
        cardIndex: 0,
        listID: targetItem.el.list.id,
        cardID: currentDragStartCard.cardID
      }))
    }
    setListsCardsToRender(copyListItems)
  }

  const handleDragLeaveList = (e) => {
    e.preventDefault()
  }

  const allowDrop = (e) => {
    e.preventDefault()
  }

  const drop = (e) => {
    e.preventDefault()
    listsCardsToRender && 
      listsCardsToRender.map(async (el, index) => {
        const docRef = doc(db, 'lists', el.list.id)
                
        await updateDoc(docRef, {
          position: parseInt(index) + 1,
        })
      })
  }

  const handleDragEndList = (e) => {
    setDraggingList(false)
    dragItemList.current = null
    dragItemListNode.current.removeEventListener('dragend', handleDragEndList)
    dragItemListNode.current = null
  }

  const getStyles = (position) => {
    if (dragItemList.current.index === position) {
      return style.listBackgroundOpacity
    }
    return style.listForeground
  }
 
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
          {currentBoard.boardTitle}
        </div>
        <div className={style.changeColor}>
          Choose text color: 
          <div className={style.changeColor_light} onClick={chooseLight}>light</div>
          <div className={style.changeColor_dark} onClick={chooseDark}>dark</div>
        </div>
      </div>
      <div className={style.lists}>
        {listsCardsToRender && 
          listsCardsToRender.map((el, index) => {
            return (
              <>
                <div className={style.listBackground}>
                  <div key={index} 
                    onDragStart={(e) => handleDragStartList(e, {index, el})}
                    onDragEnter={draggingList || (draggingCard && !el.cards.length) ? (e) => {handleDragEnterList(e, {index, el})} : null}
                    onDragOver={draggingList ? (e) => {allowDrop(e)} : null}
                    onDragLeave={draggingList ? (e) => {handleDragLeaveList(e)} : null}
                    onDrop={(e) => {drop(e)}}
                    className={draggingList ? getStyles(index): style.listForeground} 
                    draggable={true}>
                    <List  
                      list={el.list}
                      cards={el.cards}
                      listsCardsToRender={listsCardsToRender}
                      setListsCardsToRender={setListsCardsToRender} 
                      curBoardId={currentBoard.id} 
                      draggingCard={draggingCard} 
                      setDraggingCard={setDraggingCard} />
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
