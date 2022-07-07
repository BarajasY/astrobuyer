import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC-1DdjBc4MwZSYByp088xtG9xwCbAfDSg",
    authDomain: "stars-ab7eb.firebaseapp.com",
    projectId: "stars-ab7eb",
    storageBucket: "stars-ab7eb.appspot.com",
    messagingSenderId: "688475469712",
    appId: "1:688475469712:web:52833be54256a429f36515"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);