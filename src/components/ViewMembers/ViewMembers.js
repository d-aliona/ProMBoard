import React, {useState, useEffect, useRef, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useOutsideClick from '../../hooks/useOutsideClick'
import Initials from '../../components/Initials'
import style from '../../assets/scss/board.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'

const ViewMembers = ({currentBoard}) => {
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const [showMembers, setShowMembers] = useState(false)
    const ref = useOutsideClick(() => setShowMembers(false))
    const currentOwner = users.find(member => member.id === currentBoard.owner)
    
    return (
        <>
            <div 
                className={style.headMenu} 
                style={{cursor:'pointer', position:'relative'}}
                onClick={(e) => {setShowMembers(prev => !prev); e.stopPropagation()}}>
                View members
            </div>
            {showMembers && (
                <div className={styles.dropViewMembers} ref={ref}>
                    <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Owner</p>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <Initials user={currentOwner} />
                            <span>{currentOwner.firstName + ' ' + currentOwner.lastName}</span>
                            <span style={{marginLeft:'15px',color:'#666'}}>{currentOwner.email}</span>
                        </div>
                    <hr className={styles.line} />
                    <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Invited members</p>
                    {currentBoard.invitedMembers.length > 0
                        ? currentBoard.invitedMembers.map((memberID, id) => {
                            const currentMember = users.find(user => user.id === memberID)
                            return (
                                <div style={{display:'flex', alignItems:'center', gap:'10px', marginTop:'4px'}}>
                                    <Initials user={currentMember} />
                                    <span>{currentMember.firstName + ' ' + currentMember.lastName}</span>
                                    <span style={{marginLeft:'15px',color:'#666'}}>{currentMember.email}</span>
                                </div>)
                        })
                        : <div>There are no invited members</div> 
                    }
                </div>
            )}
        </>
    )
}

export default ViewMembers