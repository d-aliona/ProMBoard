import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDzxD9TOEdX5yPypoOq-if79VlfyLZvV7I",
    authDomain: "promboard-project.firebaseapp.com",
    projectId: "promboard-project",
    storageBucket: "promboard-project.appspot.com",
    messagingSenderId: "1025462387752",
    appId: "1:1025462387752:web:15be370269950d2426a11d"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const db = getFirestore(app)

// export const storage = getStorage()

// export const eventsCollection = collection(db, 'events')
// export const membersCollection = collection(db, 'members')