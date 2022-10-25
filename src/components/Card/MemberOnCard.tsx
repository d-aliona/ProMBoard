import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';

import RemoveMemberFromCardForm from '../../features/RemoveMemberFromCardForm';
import Initials from '../../ui/Initials';
import style from '../../assets/scss/card.module.scss';

interface MemberOnCardProps {
  card: Card;
  memberID: string;
}

const MemberOnCard: React.FC<MemberOnCardProps> = ({ card, memberID }) => {
  const users = useAppSelector((state) => state.users.users);
  const [showDeleteMemberForm, setShowDeleteMemberForm] = useState(false);
  const currentMember = users.find((user) => user.id === memberID)!;

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          className={style.assignedMember}
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteMemberForm(!showDeleteMemberForm);
          }}
        >
          <Initials user={currentMember} />
        </div>
        {showDeleteMemberForm ? (
          <RemoveMemberFromCardForm
            card={card}
            memberID={memberID}
            currentMember={currentMember}
            setShowDeleteMemberForm={setShowDeleteMemberForm}
          />
        ) : null}
      </div>
    </>
  );
};

export default MemberOnCard;
