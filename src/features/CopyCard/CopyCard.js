import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import { currentCommentsState } from '../../store/slices/currentCommentsSlice'
import { currentRepliesState } from '../../store/slices/currentRepliesSlice'
import ShortenTitle from '../../ui/ShortenTitle'
import useOutsideClick from '../../hooks/useOutsideClick'
import {addNotificationToDataBase} from '../exportFunctions'
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
    const comments = useSelector(currentCommentsState)
    const replies = useSelector(currentRepliesState)
    const [newTitle, setNewTitle] = useState('')
    const ref = useOutsideClick(() => {setClickCopyCard(false)})
    const curList = allLists.find(el => el.id === card.listID)
    const curBoard = allBoards.find(el => el.id === card.boardID)
    const [openBoardList, setOpenBoardList] = useState(false)
    const [openListsList, setOpenListsList] = useState(false)
    const [openPositionList, setOpenPositionList] = useState(false)
    const [chosenBoard, setChosenBoard] = useState(curBoard)
    const [chosenList, setChosenList] = useState(curList)
    const [chosenPosition, setChosenPosition] = useState(card.position)
    const [listsOfChosenBoard, setListsOfChosenBoard] = useState([])
    const [cardsOfChosenList, setCardsOfChosenList] = useState([])
    const [checkedMem, setCheckedMem] = useState(false)
    const [checkedCom, setCheckedCom] = useState(false)
    const isPersonalBoard = user.id === curBoard.owner
    const disabled = newTitle && listsOfChosenBoard.length !== 0 ? '' : style.disabled
    
    useEffect(() => {
        const data = allLists.filter(el => el.boardID === chosenBoard.id)
        setListsOfChosenBoard(data)
    },[chosenBoard])

    useEffect(() => {
        setChosenList(listsOfChosenBoard[0])
    },[listsOfChosenBoard])

    useEffect(() => {
        if (chosenList) {
            const data = allCards.filter(el => el.listID === chosenList.id)
            setCardsOfChosenList(data)
        }
    },[chosenList])

    useEffect(() => {
        setChosenPosition(cardsOfChosenList.length + 1)
    },[cardsOfChosenList])

    const copyCard = async(e) => {
        e.stopPropagation()

        if (chosenPosition <= cardsOfChosenList.length) {
            cardsOfChosenList
            .filter(el => el.position >= chosenPosition)
            .forEach(async(el) => {
                const docRef = doc(db, 'cards', el.id)
                await updateDoc(docRef, {
                    position: el.position + 1,
                })
            })
        }
        const cardsCol = collection(db, 'cards')

        await addDoc(cardsCol, {
            cardTitle: newTitle,
            cardColor: card.cardColor,
            description: card.description,
            assignedUsers: checkedMem ? [...card.assignedUsers] : [],
            listID: chosenList.id,
            boardID: chosenBoard.id,
            commentsExist: checkedCom ? true : false,
            commentsNumber: checkedCom ? card.commentsNumber : 0,
            position: chosenPosition, 
        })
        .then((docref) => {
            if (checkedMem) {
                if (chosenBoard.id !== card.boardID) {
                    card.assignedUsers.forEach(async(el) => {
                        if (!chosenBoard.invitedMembers.includes(el) && el !==chosenBoard.owner) {
                            const docRef = doc(db, 'boards', chosenBoard.id)
                            await updateDoc(docRef, {
                                invitedMembers: [...chosenBoard.invitedMembers, el]
                            })
                            const ob = {
                                memberID: el, 
                                userID: user.id, 
                                text: 'added you to this board',
                                boardID: chosenBoard.id,
                                boardTitle: chosenBoard.boardTitle, 
                                boardColor: chosenBoard.boardColor, 
                            }
                            addNotificationToDataBase(ob)
                        }
                    })
                }
            }
            if (checkedCom) {
                comments.forEach(el => {
                    const colRef = collection(db, 'cards', docref.id, 'comments')
        
                    addDoc(colRef, {
                        comment: el.comment,
                        userID: el.userID,
                        time: el.time,
                        edited: el.edited,
                        sortkey: el.sortkey,
                    })
                    .then((comRef) => {
                        replies.forEach(re => {
                            if (re.commentID === el.id) {
                                const colReplyRef = collection(db, 'cards', docref.id, 'replies')
        
                                addDoc(colReplyRef, {
                                    reply: re.reply,
                                    userID: re.userID,
                                    time: re.time,
                                    commentID: comRef.id,
                                    sortkey: re.sortkey,
                                })
                            }
                        })
                    })
                }) 
            }
            if (checkedMem) {
                card.assignedUsers.forEach(async(el) => {
                    if (el !== user.id) {
                        const ob = {
                            memberID: el, 
                            userID: user.id, 
                            text: 'added you to this card',
                            cardID: docref.id, 
                            boardID: chosenBoard.id,
                            boardTitle: chosenBoard.boardTitle, 
                            boardColor: chosenBoard.boardColor, 
                            cardTitle: newTitle, 
                        }
                        addNotificationToDataBase(ob)
                    }
                })
            }
        }).then(() => {
            setClickCopyCard(false)
        })
        .catch((err) => {
            console.error(err)
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
                    <ShortenTitle title={chosenBoard.boardTitle} number={14}/>
                    <div>{openBoardList ? '' : '✓'}</div>
                    {openBoardList &&
                        <div className={style.copyCardDropMenu}>
                            {persBoards && 
                                persBoards.map((el) => {
                                    return (
                                        <div key={el.id} className={style.copyCardDropItem}
                                            onClick={(e) => {e.stopPropagation(); setChosenBoard(el); setOpenBoardList(false)}}>
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
                        : <ShortenTitle title={chosenList?.listTitle} number={14}/>
                    }    
                    <div>{openListsList ? '' : '✓'}</div>
                    {openListsList &&
                        <div className={style.copyCardDropMenu}>
                            {listsOfChosenBoard.length > 0 && 
                                listsOfChosenBoard.map((el) => {
                                    return (
                                        <div key={el.id} className={style.copyCardDropItem}
                                            onClick={(e) => {e.stopPropagation(); setChosenList(el); setOpenListsList(false)}}>
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
                    {chosenList ? <span>{chosenPosition}</span> : '0'}
                    <div>{openPositionList ? '' : '✓'}</div>
                    {openPositionList &&
                        <div className={style.copyCardDropMenu}>
                            {[...Array(cardsOfChosenList.length + 1)].map((x, index) => {
                                return (
                                    <div key={index} className={style.copyCardDropItem}
                                        onClick={(e) => {e.stopPropagation(); setChosenPosition(index + 1); setOpenPositionList(false)}}>
                                        {index + 1}
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div style={{display:'flex', alignItems:'start'}}>
                    {card.assignedUsers.length !== 0 || comments?.length !== 0 
                        ? <p style={{fontWeight:'400', padding:'5px'}}>keep:</p>
                        : ''
                    }
                    <div style={{padding:'5px', display:'flex', flexDirection:'column', fontWeight:'400'}}>
                        {card.assignedUsers.length !== 0 &&
                            <label style={{display:'flex', gap:'5px'}}>
                                <input type="checkbox" checked={checkedMem} onChange={() => setCheckedMem(!checkedMem)} />
                                members
                            </label>
                        }
                        {comments.length !== 0 &&
                            <label style={{display:'flex', gap:'5px'}}>
                                <input type="checkbox" checked={checkedCom} onChange={() => setCheckedCom(!checkedCom)} />
                                comments
                            </label>
                        }
                    </div>
                </div>
                <div className={`${style.copyCardButton} ${disabled}`} onClick={copyCard}>
                    Copy card
                </div>
            </div>
        </>
    )
}

export default CopyCard