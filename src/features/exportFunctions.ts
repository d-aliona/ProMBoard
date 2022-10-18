import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-client';

interface ObProps {
  memberID: string;
  userID: string;
  text: string;
  cardID?: string;
  boardID?: string;
  boardTitle: string;
  boardColor: string;
  cardTitle?: string;
}

export async function addNotificationToDataBase(ob: ObProps) {
  const colRef = collection(db, 'users', ob.memberID, 'notifications');

  addDoc(colRef, {
    fromUser: ob.userID,
    time: new Date().toLocaleString('en-GB'),
    sortkey: new Date().valueOf().toString(),
    read: false,
    text: ob.text,
    ...(ob.hasOwnProperty('cardID') && { cardID: ob.cardID }),
    ...(ob.hasOwnProperty('boardID') && { boardID: ob.boardID }),
    boardTitle: ob.boardTitle,
    boardColor: ob.boardColor,
    ...(ob.hasOwnProperty('cardTitle') && { cardTitle: ob.cardTitle }),
  }).catch((error) => {
    console.error(error.message);
  });
}
