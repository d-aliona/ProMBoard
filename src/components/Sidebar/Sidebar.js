import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// import { SidebarData } from './SidebarData'
// import styles from 'assets/scss/sidebar.module.scss'
// import { ArrowSvg } from 'assets/svg/svg-icons'
// import MenuContext from 'context/MenuContext'
// import { memberState } from 'store/slices/memberSlice'

const Sidebar = () => {
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