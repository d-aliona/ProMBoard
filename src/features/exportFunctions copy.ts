import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebase-client';

export async function addNotificationToDataBase(ob: any) {
  // const colRef = collection(db, 'users', ob.memberID, 'notifications');
  console.log(ob)
  // addDoc(colRef, {
  //   fromUser: ob.userID,
  //   time: new Date().toLocaleString('en-GB'),
  //   sortkey: new Date().valueOf().toString(),
  //   read: false,
  //   text: ob.text,
  //   ...(ob.hasOwnProperty('cardID') && { cardID: ob.cardID }),
  //   ...(ob.hasOwnProperty('boardID') && { boardID: ob.boardID }),
  //   boardTitle: ob.boardTitle,
  //   boardColor: ob.boardColor,
  //   ...(ob.hasOwnProperty('cardTitle') && { cardTitle: ob.cardTitle }),
  // }).catch((error) => {
  //   console.error(error.message);
  // });
}
