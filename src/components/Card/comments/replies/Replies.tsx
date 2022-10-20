import React from 'react';

import OneReply from './OneReply';

const Replies = ({ card, comment, replies }) => {
  return (
    <>
      <div style={{ padding: '0px 0 20px 55px' }}>
        {replies &&
          replies.map((reply) => {
            return (
              <OneReply
                key={reply.id}
                card={card}
                comment={comment}
                reply={reply}
              />
            );
          })}
      </div>
    </>
  );
};

export default Replies;
