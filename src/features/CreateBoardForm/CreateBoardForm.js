import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { doc, addDoc, collection } from 'firebase/firestore'
import { db, usersCollection } from '../../firebase-client'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import Input from '../../components/Input'
import style from '../../assets/scss/createboardForm.module.scss'
import { Preview } from '../../assets/svg/svg-icons'

const CreateBoardForm = () => {
    let navigate = useNavigate()
    const [title, setTitle] = useState(null)
    const [show, setShow] = useState(false)
    const [colorBoard, setColorBoard] = useState('#e6a3a3')
    const [showError, setShowError] =useState(false)
    const ref = useRef()
    const disabled = title ? '' : style.disabled
    const user = useSelector((state) => state.user.user)
    const boards = useSelector(personalBoardsState)

    useEffect(() => {
        const checkIfClickedOutside = (e) => {

            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
                setTitle('')
                setShowError(false)
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside)
        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [show])

    const createBoard = (e) => {
        e.preventDefault()

        if (!boards) {
            createBoardInDatabase()
        } else {
            if (boards.some(el => el.title === title)) {
                setShowError(true)
            } else {
                createBoardInDatabase()
            }

        }
    }

    const createBoardInDatabase = () => {
        const colRef = collection(db, 'boards')
        // const colRef = collection(docRef, 'personalBoards')

        addDoc(colRef, {
            boardTitle: title,
            boardColor: colorBoard,
            owner: user.id,
        })
        .then(() => {
            navigate('/auth/board/' + title)
            setShow(false)
            setShowError(false)
            setTitle('')
        })
        .catch((error) => {
            console.error(error.message)
        })
    }

    return (
        <>
            <div style={{cursor: 'pointer'}} onClick={() => setShow(prev => !prev)}>
            Create a board
            </div>
            {show && (
                <div className={style.window}>
                    <div className={style.dropCreateBoardForm} ref={ref}>
                        <div className={style.title}>
                            <span className={style.titleName}>Create a board</span>
                            <span
                                className={style.closeForm} 
                                onClick={() => {
                                    setShow(false)
                                    setShowError(false)
                                    setTitle('')
                                }}> 
                                × 
                            </span>
                        </div>
                        <hr className={style.line} />
                        <div className={style.previewImage} style={{backgroundColor: `${colorBoard}`}}>
                            <Preview />
                        </div>
                        <p>Background</p>
                        <div className={style.colourList}>
                            <div 
                                className={style.colourItem} 
                                style={{backgroundColor: '#e6a3a3'}}
                                onClick={() => setColorBoard('#e6a3a3')}></div>
                            <div 
                                className={style.colourItem} 
                                style={{backgroundColor: '#d7c5e2'}}
                                onClick={() => setColorBoard('#d7c5e2')}></div>
                            <div 
                                className={style.colourItem} 
                                style={{backgroundColor: '#c1ddec'}}
                                onClick={() => setColorBoard('#c1ddec')}></div>
                            <div 
                                className={style.colourItem} 
                                style={{backgroundColor: '#c1ecd9'}}
                                onClick={() => setColorBoard('#c1ecd9')}></div>
                            <div 
                                className={style.colourItem} 
                                style={{backgroundColor: '#e7ecc1'}}
                                onClick={() => setColorBoard('#e7ecc1')}></div>
                            <div 
                                className={style.colourItem} 
                                style={{backgroundColor: '#fbffc7'}}
                                onClick={() => setColorBoard('#fbffc7')}></div>
                        </div>
                        <div>    
                            <p>or choose your colour: 
                            <input 
                                type="color" 
                                defaultValue='#bba896'
                                style={{marginLeft: '10px'}} 
                                onChange={(e)=> {
                                setColorBoard(e.target.value) 
                                }} />
                            </p>
                        </div>
                        <p style={{marginTop: '20px'}}>Board title</p>
                        <form onSubmit={createBoard}>
                            <Input
                                type={'text'}
                                placeholder={'Enter board title'}
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />
                            {!!showError && (
                                <div className={style.error}>
                                    The board with such a title already exists. Please enter another title.
                                </div>
                            )}
                            <button
                                type='submit'
                                className={`${style.button} ${disabled}`}>
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            )}    
        </>
    )
}

export default CreateBoardForm