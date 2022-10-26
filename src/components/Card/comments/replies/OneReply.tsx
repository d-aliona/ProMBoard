import React, { useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';

import { db } from '../../../../firebase-client';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import style from '../../../../assets/scss/comments.module.scss';
import styles from '../../../../assets/scss/deleteForm.module.scss';
import SaveCancelButtons from '../../../../ui/SaveCancelButtons';
import DeleteForm from '../../../../ui/DeleteForm';

interface OneReplyProps {
  card: Card;
  reply: Reply;
}

const OneReply: React.FC<OneReplyProps> = ({ card, reply }) => {
  const user = useAppSelector((state) => state.user.user);
  const users = useAppSelector((state) => state.users.users);
  const currentMember = users.find((pers) => pers.id === reply.userID)!;
  const [clickEditReply, setClickEditReply] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [replyText, setReplyText] = useState(reply.reply);

  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setClickEditReply(false);
    setReplyText(reply.reply);
  };

  const editReply = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const docRef = doc(db, 'cards', card.id, 'replies', reply.id);

    await updateDoc(docRef, {
      reply: replyText,
    });
    setClickEditReply(false);
  };

  const deleteReply = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setConfirmDelete(false);
    await deleteDoc(doc(db, 'cards', card.id, 'replies', reply.id));
  };

  return (
    <>
      <div className={style.commentWrapper} >
        <div style={{ fontSize: '16px', fontWeight: '600' }}>
          {currentMember.firstName} {currentMember.lastName}{' '}
        </div>
        <div style={{ color: '#888' }}>{reply.time}</div>
        {!confirmDelete && !clickEditReply && currentMember.id === user.id && (
          <div style={{ textAlign: 'end', marginLeft: 'auto' }}>
            <span
              className={style.updateComment}
              style={{ color: 'rgb(38, 70, 177)' }}
              onClick={(e) => {
                setClickEditReply(true);
                e.stopPropagation();
              }}
            >
              Edit
            </span>
            <span
              className={style.updateComment}
              style={{ color: 'rgb(129, 3, 3)' }}
              onClick={(e) => {
                setConfirmDelete(true);
                e.stopPropagation();
              }}
            >
              Delete
            </span>
          </div>
        )}
      </div>
      <div>
        <div>
          {clickEditReply ? (
            <>
              <textarea
                className={style.editReply}
                value={replyText}
                autoFocus
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
              <div style={{ marginLeft: 'calc(35px + 10px)' }}>
                <SaveCancelButtons 
                  onClickSave={editReply}
                  onClickCancel={cancel}
                />
              </div>
            </>
          ) : (
            <>
              <pre>
                <div className={style.replyText}>{reply.reply}</div>
              </pre>
              {confirmDelete && (
                <div style={{ width: '200px', margin: '0 auto' }}>
                  <DeleteForm 
                    text={'Delete this reply?'}
                    onClickYes={deleteReply}
                    onClickNo={(e) => {
                      setConfirmDelete(false);
                      e.stopPropagation();
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OneReply;
