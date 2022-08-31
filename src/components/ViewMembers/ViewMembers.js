import React, {useState, useEffect, useRef, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/board.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'

const ViewMembers = ({currentBoard}) => {
    const user = useSelector((state) => state.user.user)
    const [showMembers, setShowMembers] = useState(false)
    const ref = useOutsideClick(() => setShowMembers(false))

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
                        <div>
                            <span>{user.firstName + ' ' + user.lastName}</span>
                            <span style={{marginLeft:'15px',color:'#666'}}>{user.email}</span>
                        </div>
                    <hr className={styles.line} />
                    <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Invited members</p>
                    {currentBoard.invitedMembers.length 
                        ? currentBoard.invitedMembers.map((member, id) => 
                            <div>
                                <span>{member.firstName + ' ' + member.lastName}</span>
                                <span style={{marginLeft:'15px',color:'#666'}}>{member.email}</span>
                            </div>
                            )
                        : <div>There are no invited members</div> 
                    }
                </div>
            )}
        </>
    )
}

export default ViewMembers