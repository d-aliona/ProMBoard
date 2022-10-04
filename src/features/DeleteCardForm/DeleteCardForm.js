import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { currentCardsState } from '../../store/slices/currentCardsSlice';
import style from '../../assets/scss/deleteForm.module.scss';

const DeleteCardForm = ({ card, setClickDelete }) => {
  const cards = useSelector(currentCardsState);
  let navigate = useNavigate();

  const deleteCard = async () => {
    cards.forEach(async (el) => {
      if (el.listID === card.listID) {
        if (el.position > card.position) {
          const docRef = doc(db, 'cards', el.id);

          await updateDoc(docRef, {
            position: el.position - 1,
          });
        }
      }
    });
    navigate(-1);
    await deleteDoc(doc(db, 'cards', card.id));
    setClickDelete(false);
  };

  return (
    <>
      <div className={style.deleteCardForm}>
        Delete this card?
        <button
          className={style.buttonYes}
          style={{ fontSize: '16px' }}
          onClick={deleteCard}
        >
          Yes
        </button>
        <button
          className={style.buttonNo}
          style={{ fontSize: '16px' }}
          onClick={(e) => {
            setClickDelete(false);
            e.stopPropagation();
          }}
        >
          No
        </button>
      </div>
    </>
  );
};

export default DeleteCardForm;
