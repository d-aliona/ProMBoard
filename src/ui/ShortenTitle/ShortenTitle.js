import React, { useState } from 'react'

import style from '../../assets/scss/ui.module.scss'

const ShortenTitle = ({title, number}) => {
    const [showHint, setShowHint] = useState(false)
    const [coords, setCoords] = useState({x: 0, y: 0})

    return (
        <>
            {title?.length < number
                ? title
                :<>
                    <div 
                        onMouseOver={(e) => {setShowHint(true); setCoords({x: e.clientX, y: e.clientY + 20})}}
                        onMouseOut={() => setShowHint(false)}>
                        {title?.substr(0, number - 1) + '...'}
                    </div>
                    {showHint && <div className={style.hint} style={{left: coords.x, top: coords.y}}>{title}</div> }
                </> 
            }
        </>
    )
}

export default ShortenTitle