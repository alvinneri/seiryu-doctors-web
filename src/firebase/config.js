import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
});

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
