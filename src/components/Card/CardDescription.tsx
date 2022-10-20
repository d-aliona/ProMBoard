import React, { useState, useRef } from 'react';

import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import useOutsideClick from '../../hooks/useOutsideClick';
import style from '../../assets/scss/card.module.scss';

const CardDescription: React.FC<CardProps> = ({ card }) => {
  const [clickDescription, setClickDescription] = useState(false);
  const [description, setDescription] = useState(card.description);
  const refInput = useRef<HTMLTextAreaElement | null>(null);
  
  const updateCardDescription = async () => {
    if (refInput.current) {
      const docRef = doc(db, 'cards', card.id);

      await updateDoc(docRef, {
        description: refInput.current.value,
      });
    }
    setClickDescription(false);
    refInput.current = null;
  };

  const refDiv = useOutsideClick(updateCardDescription);

  const handleInputDescription = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setClickDescription(true);
    if (refInput.current) {
      refInput.current.style.border = '2px solid rgba(23, 43, 77, .7)';
    }
  };

  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setClickDescription(false);
    setDescription(card.description);
  };

  return (
    <>
      <div className={style.boundaries}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className={style.descriptionicon}></div>
          <div style={{ fontSize: '18px' }}>Description</div>
        </div>
        <div className={style.descriptionText} onClick={handleInputDescription}>
          {clickDescription ? (
            <>
              <div ref={refDiv}>
                <textarea
                  ref={refInput}
                  className={style.inputDescription}
                  value={description}
                  autoFocus
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <button
                  className={style.buttonTrue}
                  onClick={updateCardDescription}
                >
                  Save
                </button>
                <button className={style.buttonCancel} onClick={cancel}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <pre>
                <div
                  style={{
                    minHeight: '50px',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {card.description === ''
                    ? 'Add a more detailed description...'
                    : card.description}
                </div>
              </pre>
              {!clickDescription && card.description && (
                <button
                  style={{ alignSelf: 'flex-end' }}
                  className={style.buttonTrue}
                  onClick={(e) => {
                    e.stopPropagation();
                    setClickDescription(true);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardDescription;
