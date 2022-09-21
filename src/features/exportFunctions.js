import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase-client'

export async function addNotificationToDataBase(ob) {
    const colRef = collection(db, 'users', ob.memberID, 'notifications')
    
    addDoc(colRef, {
        fromUser: ob.userID,
        time: new Date().toLocaleString('en-GB'),
        read: false,
        text: ob.text,
        ...(ob.hasOwnProperty('cardID') && {cardID: ob.cardID}),
        ...(ob.hasOwnProperty('boardID') && {boardID: ob.boardID}),
        boardTitle: ob.boardTitle,
        boardColor: ob.boardColor,
        ...(ob.hasOwnProperty('cardTitle') && {cardTitle: ob.cardTitle}), 
    })
    .catch((error) => {
        console.error(error.message)
    })
}
