import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import AddCardForm from '../../features/AddCardForm'
import style from '../../assets/scss/list.module.scss'
import { TickDown } from '../../assets/svg/svg-icons'

const List = ({list, curBoardId}) => {
    
    return (
        <>
            <div className={style.listWrapper}>
                <div className={style.listTitle}>
                    {list.listTitle}
                </div>
                <AddCardForm list={list} curBoardId={curBoardId}/>
            </div>
        </>
    )
}

export default List