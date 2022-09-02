import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import useOutsideClick from '../../hooks/useOutsideClick'
import { currentListsState } from '../../store/slices/currentListsSlice'

import style from '../../assets/scss/deleteForm.module.scss'

const DeleteListForm = ({list, setShowMenu}) => {
    
    const [show, setShow] = useState(true)
    const title = useParams()
    const lists = useSelector(currentListsState)  
    const boards = useSelector(personalBoardsState)
    const currentBoard = boards.find(ob => ob.id === title.id)

    const handleClickOutside = () => {
        setShow(false)
    }

    const deleteList = async () => {
        
        lists.forEach(async(el) => {
            if (el.position > list.position) {
              const docRef = doc(db, 'lists', el.id)
                    
              await updateDoc(docRef, {
                  position: el.position - 1,
              })
            }  
          })

        await deleteDoc(doc(db, "lists", list.id))
               
        setShow(false)
    }

    const cancel = () => {
        setShow(false)
        // setShowMenu(true)
        
    }
    const ref = useOutsideClick(handleClickOutside)
 
    return (
        <> 
            {show &&
                <div className={style.window}>
                    <div className={style.deleteListForm} ref={ref}>
                        <p>Are you sure you want to delete </p>
                        <p>the list <strong>{list.listTitle} </strong></p>
                        <p>from the board <strong>{currentBoard.boardTitle}</strong>?</p>
                        <div>
                            <button className={style.buttonYes} onClick={deleteList}>
                                Yes
                            </button>
                            <button className={style.buttonNo} onClick={cancel}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DeleteListForm
