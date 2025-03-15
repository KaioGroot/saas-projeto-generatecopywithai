import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBTOAnPOnVhHYlHQoSTAMxXCuT49mFANsE',
    authDomain: 'primeiro-projeto-c4aa8.firebaseapp.com',
    databaseURL: 'https://primeiro-projeto-c4aa8-default-rtdb.firebaseio.com',
    projectId: 'primeiro-projeto-c4aa8',
    storageBucket: 'primeiro-projeto-c4aa8.firebasestorage.app',
    messagingSenderId: '739705657694',
    appId: '1:739705657694:web:ef86204510cfa4eb13d7cf',
    measurementId: 'G-SNZQG74N1T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
