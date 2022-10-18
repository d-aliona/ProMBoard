import React, { useState, useEffect, useRef } from 'react';

import style from '../../assets/scss/ui.module.scss';
import useWindowSize from '../../hooks/useWindowSize';

interface ShortenTitleProps {
  title: string;
  number: number;
  pos?: string;
  left?: string;
  top?: string;
  showOnlyHint?: boolean; 
}

const ShortenTitle: React.FC<ShortenTitleProps> = ({ title, number, pos, left, top, showOnlyHint }) => {
  const [showHint, setShowHint] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hintHeight, setHintHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  useEffect(() => {
    if (ref.current) {
      setHintHeight(ref?.current?.clientHeight);
    }
  }, [coords]);

  const handlerMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
    setShowHint(true);
    setCoords({
      x:
        e.clientX + 300 < size.width
          ? e.clientX
          : size.width - 300,
      y:
        e.clientY + 20 + hintHeight < size.height
          ? e.clientY + 20
          : e.clientY - 20 - hintHeight,
    });
  };

  return (
    <>
      {showOnlyHint && (
        <>
          <div
            onMouseOver={(e) =>handlerMouseOver(e)}
            onMouseOut={() => setShowHint(false)}
          >
            {title?.substr(0, 1)}
          </div>
          {showHint && (
            <div
              className={style.hint}
              style={{
                position: pos ? pos : `static`,
                left: left ? left : coords.x,
                top: top ? top : coords.y,
              }}
              ref={ref}
            >
              {title?.substr(2)}
            </div>
          )}
        </>
      )}
      {!showOnlyHint && title?.length < number
        ? title
        : !showOnlyHint && (
            <>
              <div
                onMouseOver={(e) => handlerMouseOver(e)}
                onMouseOut={() => setShowHint(false)}
              >
                {title?.substr(0, number - 1) + '...'}
              </div>
            </>
          )}
      {showHint && !showOnlyHint && (
        <div
          className={style.hint}
          style={{
            position: pos,
            left: left ? left : coords.x,
            top: top ? top : coords.y,
          }}
          ref={ref}
        >
          {title}
        </div>
      )}
    </>
  );
};

export default ShortenTitle;
