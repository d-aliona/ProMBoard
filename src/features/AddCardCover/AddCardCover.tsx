import React, { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/card.module.scss';

interface AddCardCoverProps {
  card: Card;
  setClickAddCover: Dispatcher;
}

const AddCardCover: React.FC<AddCardCoverProps> = ({ card, setClickAddCover }) => {
  const [isCover, setIsCover] = useState(
    card.cardColor === 'white' ? false : true
  );
  const ref = useOutsideClick(() => {
    setClickAddCover(false);
  });

  const updateColor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const ev = e.target as HTMLDivElement;
    const docRef = doc(db, 'cards', card.id);

    updateDoc(docRef, {
      cardColor: ev.style.backgroundColor,
    });
    setIsCover(true);
  };

  const removeCover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
            onClick={updateColor}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#ffeac7' }}
            onClick={updateColor}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#feffc7' }}
            onClick={updateColor}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#cefbcb' }}
            onClick={updateColor}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#b8edff' }}
            onClick={updateColor}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#b8daf7' }}
            onClick={updateColor}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#f0c7ff' }}
            onClick={updateColor}
          ></div>
          <div
            className={style.colorItem}
            style={{ backgroundColor: '#ffc7df' }}
            onClick={updateColor}
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
