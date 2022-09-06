import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-client'
import DeleteMemberFromCardForm from '../../features/DeleteMemberFromCardForm'
import AssignMemberForm from '../../features/AssignMemberForm'
import Initials from '../../components/Initials'
import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/card.module.scss'

const CardMembers = ({card}) => {
    const users = useSelector((state) => state.users.users)
    const [clickAddMembers ,setClickAddMembers] = useState(false)    
    // const [showDeleteMemberForm, setShowDeleteMemberForm] = useState(false)

    return (
        <>
            <div style={{padding: '20px 0 20px 20px'}}>
                <div style={{display: 'flex', alignItems:'flex-end', gap: '10px'}}>
                    <div className={style.displayMembersicon}></div>
                    <div style={{fontSize: '18px'}}>Members</div>
                </div>
                <div style={{display:'flex', gap:'10px', flexWrap:'wrap', margin:'10px 0 0 45px'}}>
                    {card.assignedUsers &&
                        card.assignedUsers.map((memberID, key) => {
                            const currentMember = users.find(user => user.id === memberID)
                            
                            return (<>
                                {/* <MemberOnCard /> */}
                                <div key={key} style={{display:'flex'}}>
                                    <div className={style.assignedMember}
                                        onClick={(e) => {
                                            e.stopPropagation()}} 
                                        data-descr={currentMember.firstName + ' ' + currentMember.lastName + ' ' + currentMember.email}>
                                        <Initials user={currentMember} />
                                    </div>
                                    <DeleteMemberFromCardForm /> 
                                    {/* {true ? 
                                        (<div>
                                            <div>
                                                <Initials user={currentMember} />
                                                <div>
                                                    <p>{currentMember.firstName + ' ' + currentMember.lastName}</p>
                                                    <p>{currentMember.email}</p>
                                                </div>
                                            </div>
                                            <div>Remove from card</div>
                                        </div>) : null} */}
                                </div>
                                </>)
                        })}
                    <div className={style.assignMember}
                        onClick={(e) => {setClickAddMembers(true); e.stopPropagation()}}>
                        +
                    </div>
                </div>
                {clickAddMembers && 
                    <AssignMemberForm card={card} setClickAddMembers={setClickAddMembers}/>
                } 
            </div>
        </>
    )
}

export default CardMembers