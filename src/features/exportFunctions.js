import React, { useState, useEffect, useRef } from 'react'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase-client'

export async function addNotificationToDataBase(memberID, userID, text, cardID, boardID) {
    const colRef = collection(db, 'users', memberID, 'notifications')
    
    addDoc(colRef, {
        fromUser: userID,
        time: new Date().toLocaleString('en-GB'),
        read: false,
        text: text,
        cardID: cardID,
        boardID: boardID, 
    })
    .catch((error) => {
        console.error(error.message)
    })
}
