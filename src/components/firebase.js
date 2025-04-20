// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    // Your Firebase config here
    apiKey: "AIzaSyB4kOwEPhDDtvPAvhiJzS6W7MpMrvmZ6M8",
    authDomain: "tetgurukul-227bd.firebaseapp.com",
    projectId: "tetgurukul-227bd",
    storageBucket: "tetgurukul-227bd.web.app",
    messagingSenderId: "916915233757",
    appId: "1:916915233757:web:1c02b0cfdbd0b777704c34",
    measurementId: "G-2HJXE5HG3W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
