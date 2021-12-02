// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDqHuPGBcQol1TYjufPnRy9S-YoVGIlzjA',
  authDomain: 'weatherapp-ab1ca.firebaseapp.com',
  projectId: 'weatherapp-ab1ca',
  storageBucket: 'weatherapp-ab1ca.appspot.com',
  messagingSenderId: '346137703934',
  appId: '1:346137703934:web:3b75c336bf082b2f57bcaf',
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const fireStore = initializeFirestore(fireBaseApp, {});

export default fireStore;
