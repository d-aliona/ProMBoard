import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { TickDown } from '../../assets/svg/svg-icons'
import ShortenTitle from '../../ui/ShortenTitle'
import useOutsideClick from '../../hooks/useOutsideClick'
import { allListsState } from '../../store/slices/allListsSlice'
import { allCardsState } from '../../store/slices/allCardsSlice'
import { allBoardsState } from '../../store/slices/allBoardsSlice'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import style from '../../assets/scss/card.module.scss'

const CopyCard = ({card, setClickCopyCard}) => {
    const user = useSelector((state) => state.user.user)
    const persBoards = useSelector(personalBoardsState)
    const allBoards = useSelector(allBoardsState)
    const allLists = useSelector(allListsState)
    const allCards = useSelector(allCardsState)
    const [newTitle, setNewTitle] = useState('')
    const ref = useOutsideClick(() => {setClickCopyCard(false)})
    const curList = allLists.find(el => el.id === card.listID)
    const curBoard = allBoards.find(el => el.id === card.boardID)
    const [openBoardList, setOpenBoardList] = useState(false)
    const [openListsList, setOpenListsList] = useState(false)
    const [openPositionList, setOpenPositionList] = useState(false)
    const [chooseBoard, setChooseBoard] = useState(curBoard)
    const [chooseList, setChooseList] = useState(curList)
    const [choosePosition, setChoosePosition] = useState(card.position)
    const [listsOfChosenBoard, setListsOfChosenBoard] = useState([])
    const [cardsOfChosenList, setCardsOfChosenList] = useState([])
    const isPersonalBoard = user.id === curBoard.owner
    const disabled = newTitle ? '' : style.disabled

    useEffect(() => {
        const data = allLists.filter(el => el.boardID === chooseBoard.id)
        setListsOfChosenBoard(data)
    },[chooseBoard])

    useEffect(() => {
        setChooseList(listsOfChosenBoard[0])
    },[listsOfChosenBoard])

    useEffect(() => {
        if (chooseList) {
            const data = allCards.filter(el => el.listID === chooseList.id)
            setCardsOfChosenList(data)
        }
    },[chooseList])

    useEffect(() => {
        setChoosePosition(cardsOfChosenList.length + 1)
    },[cardsOfChosenList])

    const copyCard = (e) => {
        e.stopPropagation()
        const docRef = doc(db, 'cards', card.id)
              
        updateDoc(docRef, {
            cardColor: e.target.style.backgroundColor,
        })
        
    }  
    
    return (
        <> 
            <div className={style.cardCoverWrapper} ref={ref}>
                <input
                    className={style.inputField} 
                    type={'text'}
                    placeholder={'new title'}
                    value={newTitle}
                    onChange={(e) => {
                        setNewTitle(e.target.value)
                    }}
                />
                <p style={{fontWeight:'400', padding:'5px 0 0 2px'}}>board:</p>
                <div className={style.copyCardItem} 
                    onClick={(e) => {setOpenBoardList(prev => !prev); e.stopPropagation()}}>
                    <ShortenTitle title={chooseBoard.boardTitle} number={14}/>
                    {openBoardList ? '' : '✓'}
                    {openBoardList &&
                        <div className={style.copyCardDropMenu}>
                            {persBoards && 
                                persBoards.map((el) => {
                                    return (
                                        <div key={el.id} className={style.copyCardDropItem}
                                            onClick={(e) => {e.stopPropagation(); setChooseBoard(el); setOpenBoardList(false)}}>
                                            <ShortenTitle title={el.boardTitle} number={14}/>
                                        </div>
                                    )
                                })}
                            {isPersonalBoard ? '' 
                                : <div className={style.copyCardDropItem}>
                                    <ShortenTitle title={curBoard.boardTitle} number={14}/>
                                </div>}
                        </div>
                    }
                </div>
                
                <p style={{fontWeight:'400', padding:'5px 0 0 2px'}}>list:</p>
                <div className={style.copyCardItem}
                    onClick={(e) => {setOpenListsList(prev => !prev); e.stopPropagation()}}>
                    {listsOfChosenBoard.length === 0 
                        ? <span style={{color:'rgb(129, 3, 3)'}}>No lists</span>
                        : <ShortenTitle title={chooseList?.listTitle} number={14}/>
                    }    
                    {openListsList ? '' : '✓'}
                    {openListsList &&
                        <div className={style.copyCardDropMenu}>
                            {listsOfChosenBoard.length > 0 && 
                                listsOfChosenBoard.map((el) => {
                                    return (
                                        <div key={el.id} className={style.copyCardDropItem}
                                            onClick={(e) => {e.stopPropagation(); setChooseList(el); setOpenListsList(false)}}>
                                            <ShortenTitle title={el.listTitle} number={14}/>
                                        </div>
                                    )
                                })}
                        </div>
                    }
                </div>
                <p style={{fontWeight:'400', padding:'5px 0 0 2px'}}>position:</p>
                <div className={style.copyCardItem}
                    onClick={(e) => {setOpenPositionList(prev => !prev); e.stopPropagation()}}>
                    {chooseList ? <span>{choosePosition}</span> : '0'}
                    {openPositionList ? '' : '✓'}
                    {openPositionList &&
                        <div className={style.copyCardDropMenu}>
                            {[...Array(cardsOfChosenList.length + 1)].map((x, index) => {
                                return (
                                    <div key={index} className={style.copyCardDropItem}
                                        onClick={(e) => {e.stopPropagation(); setChoosePosition(index + 1); setOpenPositionList(false)}}>
                                        {index + 1}
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <p style={{fontWeight:'400', padding:'5px'}}>keep:</p>
                <div className={style.colorList}>
                    
                    
                </div>
                <div className={`${style.copyCardButton} ${disabled}`} onClick={copyCard}>
                    Copy card
                </div>
            </div>
        </>
    )
}

export default CopyCard