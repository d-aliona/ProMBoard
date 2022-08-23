import React, { useState, useEffect, useRef } from 'react'

import style from '../../assets/scss/card.module.scss'


const CardTitle = ({card, list, setShow}) => {
    
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
                        setShow(false)
                    }}> 
                    × 
                </div>
            </div>
        </>
    )
}

export default CardTitle