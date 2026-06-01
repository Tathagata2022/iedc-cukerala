import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_E0PHqYMVzi1tCwL9yEXaqGnnjiZaWM",
  authDomain: "iedc-cuk.firebaseapp.com",
  projectId: "iedc-cuk",
  storageBucket: "iedc-cuk.firebasestorage.app",
  messagingSenderId: "1081319258572",
  appId: "1:1081319258572:web:918de8b922cb3a9f764569",
  measurementId: "G-PTSYHKBC1N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;