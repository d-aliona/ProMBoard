import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import useOutsideClick from '../../hooks/useOutsideClick'
import { currentListsState } from '../../store/slices/currentListsSlice'

import style from '../../assets/scss/deleteListForm.module.scss'

const DeleteListForm = ({list, curBoardId, setShowMenu}) => {
    
    const [show, setShow] = useState(true)
    const title = useParams()
    const lists = useSelector(currentListsState)    
    const handleClickOutside = () => {
        setShow(false)
    }

    const deleteList = async () => {
        
        lists.forEach(async(el) => {
            if (el.position > list.position) {
                // console.log(list.position)
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
                        <p>from the board <strong>{title.id}</strong>?</p>
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
