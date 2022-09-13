import React, { useState } from 'react'

import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import Cards from '../Cards'
import AddCardForm from '../../features/AddCardForm'
import style from '../../assets/scss/list.module.scss'
import DropListMenu from '../../features/DropListMenu'
import useOutsideClick from '../../hooks/useOutsideClick'

const List = ({ list, cards, curBoardId, draggingCard, setDraggingCard, listsCardsToRender, setListsCardsToRender }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [listtitle, setListtitle] = useState(list.listTitle)
    const [clickTitle, setClickTitle] = useState(false)
    const ref = useOutsideClick(() => setShowMenu(false))
    
    const updateListTitle = async (a) => {
        
        if (refInput.current.value === '') {
            refInput.current.style.border = '2px solid red'
            refInput.current.placeholder = 'There should be a title'
        } else {
            const docRef = doc(db, 'lists', a)
              
            await updateDoc(docRef, {
                listTitle: refInput.current.value,
            })
            setClickTitle(false)
            refInput.current = null
        }
    }

    const refInput = useOutsideClick(() => updateListTitle(list.id))

    const toggle = (e) => {
        setShowMenu(prev => !prev)
        e.stopPropagation()
    }

    const handleListTitle = (e) => {
        e.stopPropagation()
        setClickTitle(true)
        refInput.current.style.border = '2px solid rgba(23, 43, 77, .7)'
    }

    return (
        <> 
            <div className={style.listWrapper}>
                <div className={style.listHeader}>
                    <div className={style.listTitle} onClick={handleListTitle}>
                        {clickTitle ? 
                            <input 
                                ref={refInput}
                                type='text'
                                className={style.inputTitle}
                                value={listtitle}
                                autoFocus
                                onChange={(e) => setListtitle(e.target.value)}
                                />
                            : <span style={{height: '32px', lineHeight: '200%'}}> {list.listTitle} </span>}
                    </div>
                    <div className={style.listMenu} onClick={toggle}>•••</div>
                </div>
                {showMenu && (
                    <div className={style.dropMenu} ref={ref}>
                        <DropListMenu 
                            list={list} 
                            curBoardId={curBoardId} 
                            setShowMenu={setShowMenu} 
                            setClickTitle={setClickTitle}/>
                    </div>
                )}
                {<Cards 
                    list={list} 
                    cards={cards}
                    listsCardsToRender={listsCardsToRender}
                    setListsCardsToRender={setListsCardsToRender}
                    curBoardId={curBoardId} 
                    draggingCard={draggingCard} 
                    setDraggingCard={setDraggingCard}/>}
                <AddCardForm list={list} curBoardId={curBoardId} />
            </div>
        </>
    )
}

export default List