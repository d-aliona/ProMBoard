import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, orderBy, doc, query, onSnapshot, where } from 'firebase/firestore'
import { db, usersCollection } from '../../firebase-client'

import { currentListsState } from '../../store/slices/currentListsSlice'
import style from '../../assets/scss/addListForm.module.scss'

const AddListForm = (props) => {
    const title = props.title
    const curBoardId = props.curBoardId
    
    const lists = useSelector(currentListsState)
    const user = useSelector((state) => state.user.user)
    const [clickAddList, setClickAddList] = useState(false)
    const [listTitle, setListTitle] = useState('')
    const [showError, setShowError] =useState(false)
    const disabled = listTitle ? '' : style.disabled

    const selectedLists = lists.filter((list) => list.boardID === curBoardId)
    
    const addList = (e) => {
      e.preventDefault()

      if (!lists) {
        setShowError(false)
        addListToDatabase()
      } else {
          if (lists.some(el => el.listTitle === listTitle)) {
              setShowError(true)
          } else {
            addListToDatabase()
            setShowError(false)
          }

      }
    }
    
    const addListToDatabase = async () => {
      const listsCol = collection(db, 'lists')
            
      await addDoc(listsCol, {
        listTitle: listTitle,
        boardID: curBoardId,
        position: selectedLists.length ? selectedLists.length + 1 : 1 
      }).catch((err) => {
        console.error(err)
      })

      setListTitle('')
      setClickAddList(false)
      setShowError(false)
    }

    const cancel = () => {
      setClickAddList(false)
      setListTitle('')
      setShowError(false)
    }

  return (
    <>
      {clickAddList && 
        <form className={style.addForm} onSubmit={addList}>
          <input 
            className={style.inputTitle}
            type='text'
            placeholder='Enter list title'
            value={listTitle}
            onChange={(e) => {
                setListTitle(e.target.value)
            }}
            autoFocus
            required
          />
          {!!showError && (
            <div className={style.error}>
                The list with such a title already exists. Please enter another title.
            </div>
          )}
          <div className={style.actions}>
            <button className={`${style.action} ${disabled}`} type='submit'>
              Add list
            </button>
            <span className={style.action} onClick={cancel}>×</span>
          </div>
        </form>
      }
      {!clickAddList && 
        <div className={style.addList} onClick={() => setClickAddList(prev => !prev)}>
          <span className={style.plus}>+</span>
          {title}
        </div>
      }
      
    </>
    

  )
}

export default AddListForm