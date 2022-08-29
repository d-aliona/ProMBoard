import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

import style from '../../assets/scss/card.module.scss'

const Card = ({card, list}) => {
    let navigate = useNavigate()
    const title = useParams()
    
    const handleClickToOpenCard = (e) => {
        e.stopPropagation()
        navigate('/auth/board/' + title.id + '/' + card.id, {state: {list: list, card: card}})
    }

    return (
        <>
            <div className={style.cardWrapper} >
                <div className={style.cardTitle} onClick={handleClickToOpenCard}>
                    {card.cardTitle}
                    <div style={{display:'flex', gap:'10px'}}>
                        {card.description ? 
                            <abbr title="This card has a description">
                                <div className={style.descriptioniconMini}></div>
                            </abbr> 
                            : null }
                        {card.commentsExist ? 
                            <div style={{display:'flex', gap:'4px', alignItems:'end'}}>
                                <abbr title="This card has comments">
                                <div className={style.commenticonMini}></div>
                                </abbr> 
                                <div style={{color:'black'}}>{card.commentsNumber}</div>
                            </div>
                        : null }   
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card