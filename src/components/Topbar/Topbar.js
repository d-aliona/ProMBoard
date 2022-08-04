import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../../firebase-client'
import { signOut } from 'firebase/auth'
import { userState, removeUser } from '../../store/slices/userSlice'
import { avatarState } from '../../store/slices/avatarSlice'

// import profile from 'assets/images/profile.svg'
// import logout from 'assets/images/logout.svg'
import Logo from '../Logo'
import style from '../../assets/scss/topbar.module.scss'

function Topbar() {
  const user = useSelector(userState)
  const isAvatar = useSelector(avatarState)
//   const avatar = isAvatar ? isAvatar : '?'
  const [avatar, setAvatar] = useState('?')
  const [showDropListAuth, setShowDropListAuth] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
//   console.log(isAvatar)

  useEffect(() => {
    if (isAvatar) {
      setAvatar(isAvatar)
    }
  }, [isAvatar, avatarState])

  const [show, setShow] = useState(false)
//   const [currentUserEmail, setCurrentUserEmail] = useState(email)
  const ref = useRef()

  const toggle = () => setShow(!show)

    const signout = () => {
        signOut(auth)
        dispatch(removeUser())
        toggle()
        navigate('/')
    }

  const goToProfile = () => {
    toggle()
    navigate('/profile')
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
        
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickedOutside)

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [show])

//   const { isMenuCheked, setIsMenuChecked } = useContext(MenuContext)
//   const burgerClasses = isMenuCheked ? `${styles.menuBtn} ${styles.bgBurger}` : styles.menuBtn
//   const menuToggleClasses = isMenuCheked ? `${styles.menuToggleActive} ${styles.menuToggle}` : styles.menuToggle

    return (
        <nav className={style.navbar}>
            <div 
                style={{cursor: 'pointer', marginBottom: '5px'}}
                onClick={()=>navigate('/auth/home')}
            >
                <Logo />
            </div>
            <div>
                Boards
            </div>
            <div>
                Create a board
            </div>
            <div className={style.mailbox} onClick={()=>setShow(prev => !prev)}>
                {user.email}
                <div className={style.circle}>{avatar}</div>
            </div>
            {show && (
            <div className={style.dropListAuth} ref={ref}>
                <div className={style.account}>
                    <div className={style.circle}>{avatar}</div>
                    <div>
                        <p>first Name?  last Name?</p>
                        <p style={{color: '#999', marginTop: '6px'}}>{user.email}</p>
                    </div>
                </div>
                <hr className={style.line} />
                <div style={{cursor: 'pointer'}} onClick={goToProfile}>
                    Profile
                </div>
                <hr className={style.line} />
                <div style={{cursor: 'pointer'}} onClick={signout}>
                    Log Out
                </div>
                {/* <button type="button" className={style.dropdownItem} onClick={goToProfile}>
                    <img className={style.imgProfile} src={profile} alt="profile" />
                    Profile
                </button>
                <div className={style.dropdownDivider}></div>
                <button type="submit" className={style.dropdownItem}>
                    <img className={style.imgProfile} src={logout} alt="logout" />
                    Sign Out
                </button> */}
            </div>
        )}
        </nav>   
        
//       <div className={styles.headerBuger}>
//         <input
//           id="menu-toggle"
//           className={menuToggleClasses}
//           onClick={() => setIsMenuChecked(!isMenuCheked)}
//           type="checkbox"
//         />
//         <label className={burgerClasses} htmlFor="menu-toggle">
//           <span></span>
//         </label>
//       </div>

//       <div>
//         <div className="mt-2">
//           {!!currentUserEmail && (
//             <div className={`${styles.authHeader}`} onClick={toggle}>
//               <div className="pt-1 d-flex align-items-center">
//                 <h4 className="h4">{member.role}</h4>
//               </div>
//               <div style={{ marginRight: '14px', marginLeft: '14px' }} className="vr"></div>
//               <div className={`d-flex align-items-center ${styles.mailbox}`}>
//                 <span className={styles.mail}>{currentUserEmail}</span>
//                 <img className={styles.avatar} src={photoURL} alt="avatar" />
//               </div>
//             </div>
//           )}
//           {!currentUserEmail && (
//             <div className={styles.authHeader} onClick={signIn}>
//               <span className={styles.signIn}>Sign In</span>
//             </div>
//           )}

          
//         </div>
//       </div>
    
  )
}

export default Topbar