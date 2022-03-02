import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
import {getFunctions} from 'firebase/functions'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYkpX2BlZvIDGP0qTlA7060NNtiwnRu7g",
  authDomain: "react-e-commerce-f818e.firebaseapp.com",
  databaseURL: "https://react-e-commerce-f818e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-e-commerce-f818e",
  storageBucket: "react-e-commerce-f818e.appspot.com",
  messagingSenderId: "324042425809",
  appId: "1:324042425809:web:6a61721366036f7a404cf0",
  measurementId: "G-EPPNQF97M0"
};

const app = initializeApp(firebaseConfig)
const fireDb = getFirestore(app)
const fs = getStorage(app)
const functions =getFunctions(app)
const auth = getAuth(app)
export  {fireDb,fs, auth, functions}