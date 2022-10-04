import React, { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/card.module.scss';

const AddCardCover = ({ card, setClickAddCover }) => {
  const [isCover, setIsCover] = useState(
    card.cardColor === 'white' ? false : true
  );
  const ref = useOutsideClick(() => {
    setClickAddCover(false);
  });

  const updateColor = (e) => {
    e.stopPropagation();
    const docRef = doc(db, 'cards', card.id);

    updateDoc(docRef, {
      cardColor: e.target.style.backgroundColor,
    });
    setIsCover(true);
  };

  const removeCover = (e) => {
    e.stopPropagation();
    const docRef = doc(db, 'cards', card.id);

    updateDoc(docRef, {
      cardColor: 'white',
    });
    setIsCover(false);
  };

  return (
    <>
      <div className={style.cardCoverWrapper} ref={ref}>
        <p style={{ fontWeight: '400', padding: '5px' }}>Choose color:</p>
        <div className={style.colorList}>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#ffb3b3' }}
            onClick={(e) => updateColor(e)}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#ffeac7' }}
            onClick={(e) => updateColor(e)}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#feffc7' }}
            onClick={(e) => updateColor(e)}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#cefbcb' }}
            onClick={(e) => updateColor(e)}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#b8edff' }}
            onClick={(e) => updateColor(e)}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#b8daf7' }}
            onClick={(e) => updateColor(e)}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#f0c7ff' }}
            onClick={(e) => updateColor(e)}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#ffc7df' }}
            onClick={(e) => updateColor(e)}
          ></div>
          {isCover && (
            <div className={style.removeCover} onClick={removeCover}>
              Remove cover
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCardCover;
