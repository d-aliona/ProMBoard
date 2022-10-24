import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyDzxD9TOEdX5yPypoOq-if79VlfyLZvV7I",
//     authDomain: "promboard-project.firebaseapp.com",
//     projectId: "promboard-project",
//     storageBucket: "promboard-project.appspot.com",
//     messagingSenderId: "1025462387752",
//     appId: "1:1025462387752:web:15be370269950d2426a11d"
// }
const firebaseConfig = {
  apiKey: 'AIzaSyAXwIA8a6Sl-Wcaz4c8eYNtHt544VDqdg8',
  authDomain: 'prom2-cc1fb.firebaseapp.com',
  projectId: 'prom2-cc1fb',
  storageBucket: 'prom2-cc1fb.appspot.com',
  messagingSenderId: '872618411134',
  appId: '1:872618411134:web:fb9ab9508d6be7dc94c42f',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log(auth)
export const db = getFirestore(app);

export const usersCollection = collection(db, 'users');
