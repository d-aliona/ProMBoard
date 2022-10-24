import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

import { updateDoc, doc, collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase-client';

import { allBoardsState } from '../../../store/slices/allBoardsSlice';
import Initials from '../../../ui/Initials';
import { addNotificationToDataBase } from '../../../features/exportFunctions';
import style from '../../../assets/scss/card.module.scss';

const CardCommentForm: React.FC<CardProps> = ({ card }) => {
  const user = useAppSelector((state) => state.user.user);
  const allBoards = useAppSelector(allBoardsState);
  const navigate = useNavigate();
  const [clickComment, setClickComment] = useState(false);
  const [comment, setComment] = useState('');
 
  const addCardComment = async () => {
    const colRef = collection(db, 'cards', card.id, 'comments');

    addDoc(colRef, {
      comment: comment,
      userID: user.id,
      time: new Date().toLocaleString('en-GB'),
      edited: false,
      sortkey: new Date().valueOf().toString(),
    })
      .then(() => {
        setClickComment(false);
        setComment('');
      })
      .catch((error) => {
        console.error(error.message);
      });

    const docRef = doc(db, 'cards', card.id);

    await updateDoc(docRef, {
      commentsExist: true,
      commentsNumber: card.commentsNumber + 1,
    });

    const curBoard = allBoards.find((el) => el.id === card.boardID)!;

    card.assignedUsers.forEach((memID) => {
      if (user.id !== memID) {
        const ob = {
          memberID: memID,
          userID: user.id!,
          text: 'added a comment',
          cardID: card.id,
          boardID: card.boardID,
          boardTitle: curBoard.boardTitle,
          boardColor: curBoard.boardColor,
          cardTitle: card.cardTitle,
        };
        addNotificationToDataBase(ob);
      }
    });

    navigate('/auth/board/' + card.boardID + '/' + card.id);
  };

  const handleInputComment = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setClickComment(true);
  };

  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setClickComment(false);
    setComment('');
  };

  return (
    <>
      <div className={style.boundaries}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className={style.commenticon}></div>
          <div style={{ fontSize: '18px' }}>Comments</div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <Initials user={user} />
          <div
            className={!clickComment ? style.commentForm : null}
            onClick={(e)=>handleInputComment}
          >
            {clickComment ? (
              <>
                <textarea
                  className={style.inputComment}
                  placeholder="Write a comment..."
                  autoFocus
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div>
                  <button
                    className={style.buttonTrue}
                    disabled={!Boolean(comment)}
                    onClick={addCardComment}
                  >
                    Save
                  </button>
                  <button className={style.buttonCancel} onClick={cancel}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div>Write a comment...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCommentForm;
