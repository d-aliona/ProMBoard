import React, { useState, useEffect, useRef } from 'react';

import style from '../../assets/scss/ui.module.scss';

const ShortenTitle = ({ title, number, position, left, top }) => {
  const [showHint, setShowHint] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hintHeight, setHintHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHintHeight(ref?.current?.clientHeight);
  }, [coords]);

  const handlerMouseOver = (e) => {
    setShowHint(true);
    setCoords({
      x:
        e.clientX + 300 < e.view.innerWidth
          ? e.clientX
          : e.view.innerWidth - 300,
      y:
        e.clientY + 20 + hintHeight < e.view.innerHeight
          ? e.clientY + 20
          : e.clientY - 20 - hintHeight,
    });
  };

  return (
    <>
      {title?.length < number ? (
        title
      ) : (
        <>
          <div
            onMouseOver={(e) => handlerMouseOver(e)}
            onMouseOut={() => setShowHint(false)}
          >
            {title?.substr(0, number - 1) + '...'}
          </div>
          {showHint && (
            <div
              className={style.hint}
              style={{
                position: position,
                left: left ? left : coords.x,
                top: top ? top : coords.y,
              }}
              ref={ref}
            >
              {title}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ShortenTitle;
