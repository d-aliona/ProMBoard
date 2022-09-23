import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import OneBoardOnBoards from '../../components/OneBoardOnBoards'
import CreateBoardForm from '../../features/CreateBoardForm'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import { notPersonalBoardsState } from '../../store/slices/notPersonalBoardsSlice'
import ViewClosedBoards from '../../features/ViewClosedBoards'
import Input from '../../ui/Input'
import style from '../../assets/scss/home.module.scss'

const Members = () => {
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const [showCreateBoardForm, setShowCreateBoardForm] = useState(false)
    const [showViewClosedBoards, setShowViewClosedBoards] = useState(false)
    const [searchBoard, setSearchBoard] = useState('')
    const [personalBoardsList, setPersonalBoardsList] = useState([])
    const [guestBoardsList, setGuestBoardsList] = useState([])
    const boards = useSelector(personalBoardsState)
    const notUserBoards = useSelector(notPersonalBoardsState)
    const guestBoards = notUserBoards && notUserBoards.length > 0 ? notUserBoards.filter((board) => board.invitedMembers.includes(user.id)) : []
    let navigate = useNavigate()
    const tempArr = [...boards]

    let setMembers = new Set()

    boards.forEach((board) => {
        if (board.invitedMembers.length > 0) {
            board.invitedMembers.forEach(el => setMembers.add(el))
        }
    })
    const members = Array.from(setMembers)
        
    return (
        <>
            <div className={style.head}>
                <p className={style.title}>
                    Members
                </p>
                <div className={style.searchField} >
                    <Input
                        pad={'30px'}
                        type={'text'}
                        placeholder={'Search members'}
                        value={searchBoard}
                        onChange={(e) => {
                            setSearchBoard(e.target.value)
                        }}
                    />
                </div>
            </div>
            <div className={style.line1} style={{ marginTop: '0' }}></div>
            {members &&
                members.map((id) => {
                    const member = users.find(el => el.id === id)
                    const memberBoards = member.guestBoards.filter(el => boards.filter(board => board.id === el)[0].owner === user.id)
                    // console.log(member.firstName, memberBoards)
                    return (
                        <div className={style.boardsGroup} key={id}>
                            <div style={{ display: 'flex'}}>
                                <h2 className={style.boardgroupTitle}>
                                    {member.firstName} {member.lastName}
                                    <span> {member.email}</span>
                                </h2>
                                <div className={style.statistics}>
                                    is invited to <b>{memberBoards.length}</b> boards
                                </div>
                            </div>
                            <div className={style.boards} >
                                {memberBoards &&
                                    memberBoards.map((boardID) => {
                                        const curBoard = boards.find(el => el.id === boardID)
                                        return (
                                            <>
                                                <div>
                                                    {curBoard.boardTitle}
                                                </div>
                                            </>
                                        )
                                    })}
                            </div>
                        </div>
                    )
                })
            }            
        </>
    )
}

export default Members
