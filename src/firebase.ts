import firebase from "firebase/compat/app"
import {collection, getFirestore} from "firebase/firestore"
import "firebase/compat/firestore"

const API_KEY = process.env.REACT_APP_FIRBASE_API_KEY
const MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID
const APP_ID = process.env.REACT_APP_FIREBASE_APP_ID
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: PROJECT_ID + ".firebaseapp.com",
    projectId: PROJECT_ID,
    storageBucket: PROJECT_ID + ".appspot.com",
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};
export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const users = collection(db, "users")
