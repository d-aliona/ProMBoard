import React, { useState, useEffect, useContext } from 'react'

import useOutsideClick from '../../hooks/useOutsideClick'
import style from '../../assets/scss/logo.module.scss'
import styles from '../../assets/scss/topbar.module.scss'

const Notification = () => {
    const [show, setShow] = useState(false)
    const ref = useOutsideClick(() => {setShow(false)})

    const toggle = (e) => {
        setShow(prev => !prev)
        e.stopPropagation()
    }

    return (
        <>
            <div className={style.logo} onClick={toggle}>
                <div className={style.bellicon}></div>
            </div>
            {show && (
                <div className={styles.dropListAuth} ref={ref}>
                    <div style={{textAlign:'center'}}>
                        Notification    
                    </div>
                    
                    <hr className={style.line} />
                    fgfdfg
                    <hr className={style.line} />
                    
                </div>
            )}    
        </>
    )
}

export default Notification