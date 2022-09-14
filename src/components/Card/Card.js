import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Initials from '../../ui/Initials'
import style from '../../assets/scss/card.module.scss'

const Card = ({card, list}) => {
    let navigate = useNavigate()
    const title = useParams()
    const users = useSelector((state) => state.users.users)
        
    const handleClickToOpenCard = (e) => {
        e.stopPropagation()
        navigate('/auth/board/' + title.id + '/' + card.id, {state: {list: list, card: card}})
    }

    return (
        <>
            <div className={style.cardWrapper} >
                <div className={style.cardTitle} onClick={handleClickToOpenCard}>
                    {card?.cardTitle}
                    <div style={{display:'flex', flexWrap:'wrap', gap:'10px'}}>
                        {card?.description ? 
                            <abbr title="This card has a description">
                                <div className={style.descriptioniconMini}></div>
                            </abbr> 
                            : null }
                        {card?.commentsExist ? 
                            <div style={{display:'flex', gap:'4px', justifyContent:'center'}}>
                                <abbr title="This card has comments">
                                    <div className={style.commenticonMini}></div>
                                </abbr> 
                                <div style={{color:'black',display:'flex',alignItems:'center'}}>{card.commentsNumber}</div>
                            </div>
                        : null }   
                        {card?.assignedUsers?.length > 0 
                            ? (<div style={{display:'flex', flexWrap:'wrap', gap:'4px', marginLeft:'auto'}}>
                                    {card.assignedUsers &&
                                        card.assignedUsers.map((memberID) => {
                                            const currentMember = users.find(user => user.id === memberID)
                                            return (
                                                <div key={memberID} 
                                                    className={style.assignedMember} 
                                                    data-descr={currentMember.firstName + ' ' + currentMember.lastName + ' ' + currentMember.email}>
                                                    <Initials user={currentMember} size={'28px'} font={'14px'}/>
                                                </div>)
                                        })}
                               </div>) 
                            : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card