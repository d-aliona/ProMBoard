import React, {useState, useEffect, useRef, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../../components/Input'
import useOutsideClick from '../../hooks/useOutsideClick'
import Initials from '../../components/Initials'
import style from '../../assets/scss/board.module.scss'
import styles from '../../assets/scss/boardsList.module.scss'

const InviteMembers = ({currentBoard}) => {
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.users.users)
    const [show, setShow] = useState(false)
    const [showDropList, setShowDropList] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [dropMemberList, setDropMemberList] = useState([])
    const ref = useOutsideClick(() => setShow(false))
    
    useEffect(() => {
        const list = 
            users.filter((member) => {
                if (searchTerm) {
                    if (((member.firstName.toLowerCase()+member.lastName.toLowerCase()).includes(searchTerm.toLowerCase()) 
                    || (member.email.includes(searchTerm)))) {
                        return member
                    }
                }
            })
        setDropMemberList(list)
    }, [searchTerm])
    console.log(dropMemberList)
    return (
        <>
            <div 
                className={style.headMenu} 
                style={{marginRight: 'auto', cursor:'pointer'}}
                onClick={(e) => {setShow(prev => !prev); e.stopPropagation()}}>
                Invite members
            </div>
            {show && (
                <div className={style.inviteMembersWindow} ref={ref}>
                    <div className={styles.title}>
                        <span className={styles.titleName} style={{fontSize:'20px', marginBottom: '20px'}}>
                            Invite new members 
                        </span>
                        <span
                            className={styles.closeForm} 
                            onClick={() => setShow(false)}> 
                            × 
                        </span>
                    </div>
                    {/* <hr className={styles.line} /> */}
                    <Input
                        type={'text'}
                        placeholder={'Enter name or email address'}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setShowDropList(true)
                        }}
                    />
                    <div className={style.dropmembersList}>
                        {showDropList && 
                            (dropMemberList.length) ? 
                            dropMemberList.map((member) => (
                                <div className={style.dropMember}>
                                    <span>
                                        {member.firstName + ' ' + member.lastName}
                                    </span>
                                </div>
                            )):(
                                <div>
                                    Looks like that person isn't a member of ProMBoard yet. 
                                    Add their email address to send an invitation. 
                                </div>
                            )
                        }
                    </div>
                    <hr className={styles.line} />
                    <p className={styles.boardsGroup} style={{marginBottom:'10px'}}>Members of this board</p>
                    <span>{user.firstName + ' ' + user.lastName}</span> 
                    <span style={{marginLeft:'20px',color:'#666'}}>owner</span>
                    {currentBoard.invitedMembers.length 
                        ? currentBoard.invitedMembers.map((member, id) => 
                            <div>
                                <span>{member.firstName + ' ' + member.lastName}</span>
                            </div>
                            )
                        : null
                    }                
                    
                </div>
            )}
        </>
    )
}

export default InviteMembers