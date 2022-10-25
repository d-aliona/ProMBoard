import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';

import { db } from '../../../firebase-client';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import Initials from '../../../ui/Initials';
import AddReplyForm from './replies/AddReplyForm';
import Replies from './replies/Replies';
import { TickDown } from '../../../assets/svg/svg-icons';
import style from '../../../assets/scss/card.module.scss';
import DeleteForm from '../../../ui/DeleteForm';

interface CommentProps {
  card: Card;
  comment: Comment;
  repliesForComment: Replies;
}

const Comment: React.FC<CommentProps> = ({ card, comment, repliesForComment }) => {
  const user = useAppSelector((state) => state.user.user);
  const users = useAppSelector((state) => state.users.users);
  const currentMember = users.find((pers) => pers.id === comment.userID)!;
  const [clickEditComment, setClickEditComment] = useState(false);
  const [clickReplyComment, setClickReplyComment] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [commentText, setCommentText] = useState(comment.comment);
  const [showReplies, setShowReplies] = useState(true);

  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setClickEditComment(false);
    setCommentText(comment.comment);
  };

  const editComment = async () => {
    const docRef = doc(db, 'cards', card.id, 'comments', comment.id);

    await updateDoc(docRef, {
      comment: commentText,
      edited: true,
    });
    setClickEditComment(false);
  };

  const deleteComment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setConfirmDelete(false);
    await deleteDoc(doc(db, 'cards', card.id, 'comments', comment.id));

    const docRef = doc(db, 'cards', card.id);
    await updateDoc(docRef, {
      commentsExist: card.commentsNumber === 1 ? false : true,
      commentsNumber: card.commentsNumber - 1,
    });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginTop: '10px',
        }}
      >
        <Initials user={currentMember} />
        <div style={{ fontSize: '16px', fontWeight: '600' }}>
          {currentMember.firstName} {currentMember.lastName}{' '}
        </div>
        <div>{comment.time}</div>
        <div>{comment.edited ? '(edited)' : null}</div>
        {!confirmDelete && currentMember.id === user.id && (
          <div style={{ textAlign: 'end', marginLeft: 'auto' }}>
            <span
              className={style.updateComment}
              style={{ color: 'rgb(38, 70, 177)' }}
              onClick={(e) => {
                setClickEditComment(true);
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
          {clickEditComment ? (
            <>
              <textarea
                className={style.editComment}
                value={commentText}
                autoFocus
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <div style={{ marginLeft: 'calc(35px + 10px)' }}>
                <button className={style.buttonTrue} onClick={editComment}>
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
                <div className={style.commentText}>{comment.comment}</div>
              </pre>
              {!confirmDelete && (
                <div className={style.replyWrapper}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginLeft: '45px',
                  }}
                >
                  <span
                    className={style.updateComment}
                    style={{ color: 'rgb(48, 121, 88)' }}
                    onClick={(e) => {
                      setClickReplyComment(true);
                      e.stopPropagation();
                    }}
                  >
                    Reply
                  </span>
                  {repliesForComment.length > 0 && (
                    <div
                      style={{
                        cursor: 'pointer',
                        transform: showReplies ? 'rotate(180deg)' : '',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowReplies(!showReplies);
                      }}
                    >
                      <TickDown />
                    </div>
                  )}
                </div>
              )}
              {clickReplyComment && (
                <AddReplyForm
                  card={card}
                  comment={comment}
                  setClickReplyComment={setClickReplyComment}
                />
              )}
              {confirmDelete && (
                <div style={{ width: '200px', margin: '0 auto' }}>
                  <DeleteForm 
                    text={'Delete this comment?'}
                    onClickYes={deleteComment}
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
        {showReplies && (
          <Replies card={card} replies={repliesForComment} />
        )}
      </div>
    </>
  );
};

export default Comment;
