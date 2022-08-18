import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../../firebase-client'
import { signOut } from 'firebase/auth'
import { userState, removeUser } from '../../store/slices/userSlice'
import { avatarState } from '../../store/slices/avatarSlice'

import Logo from '../Logo'
import CreateBoardForm from '../../features/CreateBoardForm'
import BoardsList from '../../components/BoardsList'
import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/topbar.module.scss'
import useBoardColor from '../../hooks/useBoardColor'
import MenuContext from '../../context/MenuContext'

function Topbar() {
    const user = useSelector(userState)
    const isAvatar = useSelector(avatarState)
    //   const avatar = isAvatar ? isAvatar : '?'
    const [avatar, setAvatar] = useState('?')
    const [showDropListAuth, setShowDropListAuth] = useState(false)
    const [show, setShow] = useState(false)
    const ref = useOutsideClick(() => setShow(false))
    const title = useParams()
    // console.log(title.id)
    const boardColor = useBoardColor(title)
    const {textColor} = useContext(MenuContext)

    // console.log(boardColor)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //   console.log(isAvatar)

    useEffect(() => {
        if (isAvatar) {
            setAvatar(isAvatar)
        }
    }, [isAvatar, avatarState])

    

    const toggle = (e) => {
        setShow(prev => !prev)
        e.stopPropagation()
    }

    const signout = () => {
        signOut(auth)
        dispatch(removeUser())
        setShow(prev => !prev)
        navigate('/')
    }

    const goToProfile = () => {
        setShow(prev => !prev)
        navigate('/auth/profile')
    }

    return (
        <nav className={style.navbar} 
            style={{backgroundColor: `${title.id ? boardColor : 'rgba(23, 43, 77, .2)' }`,
            color: `${title.id ? textColor : 'rgb(23, 43, 77)'}`}}>
            <div
                style={{ cursor: 'pointer', marginBottom: '5px' }}
                onClick={() => navigate('/auth/home')}
            >
                <Logo />
            </div>
            <BoardsList />
            <CreateBoardForm />
            <div className={style.mailbox} onClick={toggle}>
                {user.email}
                <div className={style.circle}>{avatar}</div>
            </div>
            {show && (
                <div className={style.dropListAuth} ref={ref}>
                    <div className={style.account}>
                        <div className={style.circle}>{avatar}</div>
                        <div>
                            <p>first Name?  last Name?</p>
                            <p style={{ color: '#999', marginTop: '6px' }}>{user.email}</p>
                        </div>
                    </div>
                    <hr className={style.line} />
                    <div style={{ cursor: 'pointer' }} onClick={goToProfile}>
                        Profile
                    </div>
                    <hr className={style.line} />
                    <div style={{ cursor: 'pointer' }} onClick={signout}>
                        Log Out
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Topbar