import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-client'

import useOutsideClick from '../../hooks/useOutsideClick'
import CloseButton from '../../ui/CloseButton'
import style from '../../assets/scss/card.module.scss'

const CardTitle = ({card, list, clickTitle, setClickTitle}) => {
    let navigate = useNavigate()
    const [cardtitle, setCardtitle] = useState(card.cardTitle)

    const updateCardTitle = async (e) => {
        if (refInput.current.value === '') {
            refInput.current.style.border = '2px solid red'
            refInput.current.placeholder = 'There should be a title'
        } else {
            const docRef = doc(db, 'cards', card.id)
                  
            await updateDoc(docRef, {
                cardTitle: refInput.current.value,
            })
            setClickTitle(false)
            refInput.current = null
        }
    }

    const refInput = useOutsideClick(updateCardTitle)

    const handleCardTitle = (e) => {
        e.stopPropagation()
        setClickTitle(true)
        refInput.current.style.border = '2px solid rgba(23, 43, 77, .7)'
    }
    
    return (
        <>
            <div className={style.openCardTitleWrapper}>
                <div style={{display: 'flex', gap: '10px'}}>
                    <div className={style.titleicon}></div>
                    <div>
                        <div  onClick={handleCardTitle}>
                            {clickTitle ? 
                                <input 
                                    ref={refInput}
                                    type='text'
                                    className={style.inputCardTitle}
                                    value={cardtitle}
                                    autoFocus
                                    onChange={(e) => setCardtitle(e.target.value)}
                                    />
                                : <div className={style.openCardTitle} style={{paddingLeft:'3px'}}>{card.cardTitle}</div>}
                        </div>
                        <div style={{color: '#999'}}>in list {list.listTitle}</div>
                    </div>
                </div>
                <CloseButton height={'26px'} onClick={() => navigate(-1)} />
                {/* <div>
                    <CloseButton onClick={(e) => {e.stopPropagation(); setClickAddMembers(false)}}/>
                </div> */}
                {/* <div
                    className={style.closeModal} 
                    onClick={() => navigate(-1)}> 
                    × 
                </div> */}
            </div>
        </>
    )
}

export default CardTitle