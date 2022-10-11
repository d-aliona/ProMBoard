import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DeleteMemberFromCardForm from '../../features/DeleteMemberFromCardForm';
import Initials from '../../ui/Initials';
import style from '../../assets/scss/card.module.scss';

const MemberOnCard = ({ card, memberID }) => {
  const users = useSelector((state) => state.users.users);
  const [showDeleteMemberForm, setShowDeleteMemberForm] = useState(false);
  const currentMember = users.find((user) => user.id === memberID);

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
          <DeleteMemberFromCardForm
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
