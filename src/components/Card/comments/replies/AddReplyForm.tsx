import React, { useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';

import { db } from '../../../../firebase-client';
import { collection, addDoc } from 'firebase/firestore';

import { addNotificationToDataBase } from '../../../../features/exportFunctions';
import { allBoardsState } from '../../../../store/slices/allBoardsSlice';
import style from '../../../../assets/scss/card.module.scss';

interface AddReplProps {
  card: Card;
  comment: Comment;
  setClickReplyComment: Dispatcher;
}

const AddReplyForm: React.FC<AddReplProps> = ({ card, comment, setClickReplyComment }) => {
  const user = useAppSelector((state) => state.user.user);
  const allBoards = useAppSelector(allBoardsState);
  const [replyText, setReplyText] = useState('');

  const saveReply = () => {
    const colRef = collection(db, 'cards', card.id, 'replies');

    addDoc(colRef, {
      reply: replyText,
      userID: user.id,
      time: new Date().toLocaleString('en-GB'),
      commentID: comment.id,
      sortkey: new Date().valueOf().toString(),
    })
      .then(() => {
        setClickReplyComment(false);
        setReplyText('');
      })
      .catch((error) => {
        console.error(error.message);
      });

    const curBoard = allBoards.find((el) => el.id === card.boardID)!;

    card.assignedUsers.forEach((memID) => {
      if (user.id !== memID) {
        const ob = {
          memberID: memID,
          userID: user.id,
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
  };

  return (
    <>
      <textarea
        className={style.editComment}
        autoFocus
        onChange={(e) => setReplyText(e.target.value)}
      ></textarea>
      <div style={{ marginLeft: 'calc(35px + 10px)' }}>
        <button className={style.buttonTrue} onClick={saveReply}>
          Save
        </button>
        <button
          className={style.buttonCancel}
          onClick={(e) => {
            e.stopPropagation();
            setClickReplyComment(false);
            setReplyText('');
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddReplyForm;
