import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import Input from '../../components/Input'
import useOutsideClick from '../../hooks/useOutsideClick'

import style from '../../assets/scss/deleteListForm.module.scss'
import { ShowPassword, HidePassword } from '../../assets/svg/svg-icons'

const DeleteListForm = ({list, curBoardId, setShowMenu}) => {
    const [messageDeleteList, setMessageDeleteList] = useState(false)
    const [show, setShow] = useState(true)
    const title = useParams()
    

    const handleClickOutside = () => {
        setShow(false)
    }

    const deleteList = async (e) => {
        
        await deleteDoc(doc(db, "lists", list.id))
        setShow(false)
    }

    const cancel = () => {
        setShow(false)
        // setShowMenu(true)
        
    }
    const ref = useOutsideClick(handleClickOutside)
    // const ref = useOutsideClick(() => setShow(false))
//   console.log(show)
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
