import React from 'react';

import OneReply from './OneReply';

interface RepliesProps {
  card: Card;
  replies: Replies;
}

const Replies: React.FC<RepliesProps> = ({ card, replies }) => {
  return (
    <>
      <div style={{ padding: '0px 0 20px 55px' }}>
        {replies &&
          replies.map((reply) => {
            return (
              <OneReply
                key={reply.id}
                card={card}
                reply={reply}
              />
            );
          })}
      </div>
    </>
  );
};

export default Replies;
