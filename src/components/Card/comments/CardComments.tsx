import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';

import { db } from '../../../firebase-client';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';

import Comment from './Comment';
import {
  setCurrentComments,
  currentCommentsState,
} from '../../../store/slices/currentCommentsSlice';
import {
  setCurrentReplies,
  currentRepliesState,
} from '../../../store/slices/currentRepliesSlice';
import style from '../../../assets/scss/card.module.scss';

const CardComments: React.FC<CardProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(currentCommentsState);
  const replies = useAppSelector(currentRepliesState);

  useEffect(() => {
    const commentsCol = collection(db, 'cards', card.id, 'comments');
    const qComments = query(commentsCol, orderBy('sortkey', 'desc'));

    onSnapshot(qComments, (snapshot) => {
      const commentsSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Comment;
      });
      dispatch(setCurrentComments(commentsSnap));
    });
  }, [card]);

  useEffect(() => {
    const repliesCol = collection(db, 'cards', card.id, 'replies');
    const qReplies = query(repliesCol, orderBy('sortkey'));

    onSnapshot(qReplies, (snapshot) => {
      const repliesSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Reply;
      });
      dispatch(setCurrentReplies(repliesSnap));
    });
  }, [card]);

  return (
    <>
      <div className={style.boundaries}>
        {comments &&
          comments.map((comment) => {
            const repliesForComment = replies.filter(
              (re) => re.commentID === comment.id
            );
            return (
              <Comment
                key={comment.id}
                card={card}
                comment={comment}
                repliesForComment={repliesForComment}
              />
            );
          })}
      </div>
    </>
  );
};

export default CardComments;
