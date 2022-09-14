import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../../firebase-client'
import { signOut } from 'firebase/auth'
import { userState, removeUser } from '../../store/slices/userSlice'

import Logo from '../../ui/Logo'
import Initials from '../../ui/Initials'
import CreateBoardForm from '../../features/CreateBoardForm'
import Notification from '../Notification'
import BoardsList from '../../components/BoardsList'
import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/topbar.module.scss'
import useBoardColor from '../../hooks/useBoardColor'
import MenuContext from '../../context/MenuContext'

function Topbar() {
    const user = useSelector(userState)
    const [show, setShow] = useState(false)
    const [showCreateBoardForm, setShowCreateBoardForm] = useState(false)
    const ref = useOutsideClick(() => {setShow(false)})
    const title = useParams()
    const boardColor = useBoardColor(title)
    const {textColor} = useContext(MenuContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
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
                onClick={() => navigate('/auth/home')}>
                <Logo />
            </div>
            <BoardsList />
            <div style={{cursor: 'pointer'}} onClick={(e) => {setShowCreateBoardForm(prev => !prev); e.stopPropagation()}}>
                Create a board
            </div>
            {showCreateBoardForm && (
                <div >
                    <CreateBoardForm setShowCreateBoardForm={setShowCreateBoardForm}/>
                </div>
            )}
            <div className={style.authbox}>
                <Notification />
                <div className={style.authbox} onClick={toggle}>
                    <div style={{marginRight:'10px'}}>{user.firstName + ' ' + user.lastName}</div>
                    <Initials user={user}/> 
                </div>
            </div>
            {show && (
                <div className={style.dropListAuth} ref={ref}>
                    <div className={style.account}>
                        <Initials user={user}/>
                        <div>
                            <p>{user.firstName + ' ' + user.lastName}</p>
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