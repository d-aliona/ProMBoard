import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import style from '../../assets/scss/card.module.scss'

const CardTitle = ({card, list}) => {
    let navigate = useNavigate()
    
    return (
        <>
            <div className={style.title}>
                <div style={{display: 'flex', gap: '10px'}}>
                    <div className={style.titleicon}></div>
                    <div>
                        <div style={{fontSize: '20px', margin:'8px 0 16px'}}>{card.cardTitle}</div>
                        <div style={{color: '#999'}}>in list {list.listTitle}</div>
                    </div>
                </div>
                <div
                    className={style.closeModal} 
                    onClick={() => {
                        navigate(-1)
                    }}> 
                    × 
                </div>
            </div>
        </>
    )
}

export default CardTitle