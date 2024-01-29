// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDgajrMyd1pVlNJSM2J70OnAOUFr25Sox0",
    authDomain: "linkedin-clone-d189b.firebaseapp.com",
    projectId: "linkedin-clone-d189b",
    storageBucket: "linkedin-clone-d189b.appspot.com",
    messagingSenderId: "689488803150",
    appId: "1:689488803150:web:ff947328a955c288cada1f"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };