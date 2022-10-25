import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-client';

import { currentCardsState } from '../../store/slices/currentCardsSlice';
import DeleteForm from '../../ui/DeleteForm';

interface DelCardProps {
  card: Card;
  setClickDelete: Dispatcher;
}

const DeleteCard: React.FC<DelCardProps> = ({ card, setClickDelete }) => {
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
    <DeleteForm 
      text={'Delete this card?'}
      onClickYes={deleteCard}
      onClickNo={(e) => {
                  setClickDelete(false);
                  e.stopPropagation();
                }}
    />
  )
};

export default DeleteCard;
