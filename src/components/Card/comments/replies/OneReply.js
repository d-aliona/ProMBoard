import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { db } from '../../../../firebase-client';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import style from '../../../../assets/scss/card.module.scss';
import styles from '../../../../assets/scss/deleteForm.module.scss';

const OneReply = ({ card, reply }) => {
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.users.users);
  const currentMember = users.find((pers) => pers.id === reply.userID);
  const [clickEditReply, setClickEditReply] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [replyText, setReplyText] = useState(reply.reply);

  const cancel = (e) => {
    e.stopPropagation();
    setClickEditReply(false);
    setReplyText(reply.reply);
  };

  const editReply = async (e) => {
    const docRef = doc(db, 'cards', card.id, 'replies', reply.id);

    await updateDoc(docRef, {
      reply: replyText,
    });
    setClickEditReply(false);
  };

  const deleteReply = async (e) => {
    e.stopPropagation();
    setConfirmDelete(false);
    await deleteDoc(doc(db, 'cards', card.id, 'replies', reply.id));
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '10px',
        }}
      >
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
                <button className={style.buttonTrue} onClick={editReply}>
                  Save
                </button>
                <button className={style.buttonCancel} onClick={cancel}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <pre>
                <div className={style.replyText}>{reply.reply}</div>
              </pre>
              {confirmDelete && (
                <div style={{ width: '200px', margin: '0 auto' }}>
                  <div className={styles.deleteCardForm}>
                    Delete this reply?
                    <button
                      className={styles.buttonYes}
                      style={{ fontSize: '16px' }}
                      onClick={deleteReply}
                    >
                      Yes
                    </button>
                    <button
                      className={styles.buttonNo}
                      style={{ fontSize: '16px' }}
                      onClick={(e) => {
                        setConfirmDelete(false);
                        e.stopPropagation();
                      }}
                    >
                      No
                    </button>
                  </div>
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
