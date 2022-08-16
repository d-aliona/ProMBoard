import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../../firebase-client'
import { signOut } from 'firebase/auth'
import { userState, removeUser } from '../../store/slices/userSlice'
import { avatarState } from '../../store/slices/avatarSlice'

import Logo from '../Logo'
import CreateBoardForm from '../../features/CreateBoardForm'
import BoardsList from '../../components/BoardsList'
import style from '../../assets/scss/topbar.module.scss'

function Topbar() {
    const user = useSelector(userState)
    const isAvatar = useSelector(avatarState)
    //   const avatar = isAvatar ? isAvatar : '?'
    const [avatar, setAvatar] = useState('?')
    const [showDropListAuth, setShowDropListAuth] = useState(false)
    const [show, setShow] = useState(false)
    const ref = useRef()
    const refMailBox = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //   console.log(isAvatar)

    useEffect(() => {
        if (isAvatar) {
            setAvatar(isAvatar)
        }
    }, [isAvatar, avatarState])

    

    const toggle = () => setShow(!show)

    const signout = () => {
        signOut(auth)
        dispatch(removeUser())
        toggle()
        navigate('/')
    }

    const goToProfile = () => {
        toggle()
        navigate('/auth/profile')
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {

            if (show && ref.current && !ref.current.contains(e.target) && !refMailBox.current.contains(e.target)) {
                setShow(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickedOutside)

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [show])

    return (
        <nav className={style.navbar}>
            <div
                style={{ cursor: 'pointer', marginBottom: '5px' }}
                onClick={() => navigate('/auth/home')}
            >
                <Logo />
            </div>
            <BoardsList />
            <CreateBoardForm />
            <div className={style.mailbox} onClick={() => setShow(prev => !prev)} ref={refMailBox}>
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