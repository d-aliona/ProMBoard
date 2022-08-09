import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// import { SidebarData } from './SidebarData'
import { personalBoardsState } from '../../store/slices/personalBoardsSlice'

import { TickDown } from '../../assets/svg/svg-icons'
import style from '../../assets/scss/sidebar.module.scss'

// import { ArrowSvg } from 'assets/svg/svg-icons'
// import MenuContext from 'context/MenuContext'
// import { memberState } from 'store/slices/memberSlice'

const Sidebar = () => {
    const [showYourBoards, setShowYourBoards] = useState(true)
    const [showGuestBoards, setShowGuestBoards] = useState(true)
    const [toggleClick, setToggleClick] = useState(true)
    const [changeTick, setChangeTick] = useState(style.tickLeft)
    // const [toggleClickUpDownPers, setToggleClickUpDownPers] = useState(true)
    const [tickUpDownPers, setTickUpDownPers] = useState(style.TickDown)
    // const [toggleClickUpDownGuest, setToggleClickUpDownGuest] = useState(true)
    const [tickUpDownGuest, setTickUpDownGuest] = useState(style.TickDown)
    const boards = useSelector(personalBoardsState)
    let navigate = useNavigate()
    
    useEffect(() => {
        setChangeTick(toggleClick ? style.tickLeft : style.tickRight)
    }, [toggleClick])

    useEffect(() => {
        setTickUpDownPers(showYourBoards ? style.tickDown : style.tickUp)
    }, [showYourBoards])

    useEffect(() => {
        setTickUpDownGuest(showGuestBoards ? style.tickDown : style.tickUp)
    }, [showGuestBoards])   

    const navigateBoard = (title) => {
        navigate('/auth/board/' + title)
    }

    return (
        <>
            {toggleClick && (
                <div className={style.wrapper}>
                    <div className={`${changeTick}`} onClick={() => setToggleClick(prev => !prev)}>
                        <TickDown />
                    </div>
                    <div className={style.dropBoards}>
                        Boards
                    </div>
                    <div className={style.dropBoards}>
                        Members <span className={style.plus}>+</span>
                    </div>
                    {showYourBoards && (
                        <div className={style.dropBoards} onClick={() => setShowYourBoards(prev => !prev)}>
                            Your boards 
                            <span className={`${tickUpDownPers}`}><TickDown /></span>
                        </div>
                    )}
                    {!showYourBoards && (
                        <div>
                            <div className={style.dropBoards} onClick={() => setShowYourBoards(prev => !prev)}>
                                Your boards 
                                <span className={`${tickUpDownPers}`}><TickDown /></span>
                            </div>
                            {boards 
                                && boards.map((board, id) => 
                                    <div key={id} className={style.listItem} onClick={() => navigateBoard(board.title)}>
                                        <div className={style.colorBoard} style={{backgroundColor: `${board.colorBoard}`}}></div>
                                        {board.title}
                                    </div>
                            )}
                        </div>
                    )}
                    <div className={style.dropBoards} onClick={() => setShowGuestBoards(prev => !prev)}>
                        Guest boards <TickDown />
                    </div>
                </div>
            )}
            {!toggleClick && (
                <div className={style.wrapperHidden} onClick={() => setToggleClick(prev => !prev)}>
                    <div className={`${changeTick}`} >
                        <TickDown />
                    </div>
                </div>    
            )}
        </>
    )
//   const [isSidebarBig, setIsSidebarBig] = useState(true)
//   const sidebarClasses = isSidebarBig ? styles.sidebar : `${styles.sidebar} ${styles.sidebarActive}`

//   const { isMenuCheked, setIsMenuChecked } = useContext(MenuContext)
//   const hideSideBarClass = isMenuCheked ? `${styles.menuToggle}` : null

//   const role = useSelector((state) => state.member.member.role)
//   const member = useSelector(memberState)
//   const [currentUser, setCurrentUser] = useState(role)

//   useEffect(() => {
//     setCurrentUser(role)
//   }, [role])
//   const [prevSelected, setPrevSelected] = useState(null)
//   const focus = styles.focus
//   const menuFocus = (e) => {
//     const selected = e.currentTarget

//     if (!selected.classList.contains(focus)) {
//       selected.classList.add(focus)
//     } else return selected
//     setPrevSelected(selected)
//     if (prevSelected.classList.contains(focus)) {
//       prevSelected.classList.remove(focus)
//     }
//     setIsMenuChecked(false)
//   }
//   return (
//     <>
//       {member.email ? (
//         <nav className={`${sidebarClasses} ${hideSideBarClass}`}>
//           <hr className={styles.horizonLine} />
//           <ul className="pt-3" style={{ paddingLeft: '0px' }}>
//             {!!currentUser &&
//               SidebarData.map((el, key) => (
//                 <Link key={key} className={`text-white ${styles.Link}`} to={el.link}>
//                   {el.rolesAccess.includes(currentUser) && (
//                     <li
//                       onClick={menuFocus}
//                       className={isSidebarBig ? styles.sidebarLi : `${styles.sidebarLi} ${styles.sidebarLiActive}`}
//                     >
//                       <div style={isSidebarBig ? { paddingRight: '20px' } : { paddingRight: '0px' }}>{el.icon}</div>
//                       {isSidebarBig && <div>{el.title}</div>}
//                     </li>
//                   )}
//                 </Link>
//               ))}
//           </ul>
//           <hr className={styles.horizonLine} />
//           {!isMenuCheked && (
//             <div className={isSidebarBig ? styles.sidebarArrow : `${styles.sidebarArrow} ${styles.sidebarArrowActive}`}>
//               <ArrowSvg onClick={() => setIsSidebarBig(!isSidebarBig)} />
//             </div>
//           )}
//         </nav>
//       ) : null}
//     </>
//   )
}

export default Sidebar