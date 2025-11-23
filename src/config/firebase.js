import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBHK2MijzmJfWbIAtHfMqW3eZPvCPZ04Dg',
  authDomain: 'mnns-quiz-app.firebaseapp.com',
  projectId: 'mnns-quiz-app',
  storageBucket: 'mnns-quiz-app.appspot.com',
  messagingSenderId: '70393812384',
  appId: '1:70393812384:web:cd22a8b583166d1b0bc0c5',
  measurementId: 'G-8X0106CSLG',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
