import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import useOutsideClick from '../../hooks/useOutsideClick';
import CloseButton from '../../ui/CloseButton';
import style from '../../assets/scss/card.module.scss';

const CardTitle = ({ card, list, clickTitle, setClickTitle }) => {
  let navigate = useNavigate();
  const [cardtitle, setCardtitle] = useState(card.cardTitle);

  const updateCardTitle = async (e) => {
    if (refInput.current.value === '') {
      refInput.current.style.border = '2px solid red';
      refInput.current.placeholder = 'There should be a title';
    } else {
      const docRef = doc(db, 'cards', card.id);

      await updateDoc(docRef, {
        cardTitle: refInput.current.value,
      });
      setClickTitle(false);
      refInput.current = null;
    }
  };

  const refInput = useOutsideClick(updateCardTitle);

  const handleCardTitle = (e) => {
    e.stopPropagation();
    setClickTitle(true);
    refInput.current.style.border = '2px solid rgba(23, 43, 77, .7)';
  };

  const handleEnterKey = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      updateCardTitle();
    }
  };

  return (
    <>
      <div className={style.openCardTitleWrapper}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className={style.titleicon}></div>
          <div style={{ width: '494px', wordBreak: 'break-all' }}>
            <div onClick={handleCardTitle}>
              {clickTitle ? (
                <textarea
                  ref={refInput}
                  type="text"
                  className={style.inputCardTitle}
                  value={cardtitle}
                  autoFocus
                  onChange={(e) => setCardtitle(e.target.value)}
                  onKeyUp={(e) => handleEnterKey(e)}
                ></textarea>
              ) : (
                <div className={style.openCardTitle}>{card.cardTitle}</div>
              )}
            </div>
            <div style={{ color: '#999' }}>in list {list.listTitle}</div>
          </div>
        </div>
        <CloseButton height={'26px'} onClick={() => navigate(-1)} />
      </div>
    </>
  );
};

export default CardTitle;
