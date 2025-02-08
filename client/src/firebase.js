// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
authDomain: "blogapp-jaydeep.firebaseapp.com",
projectId: "blogapp-jaydeep",
storageBucket: "blogapp-jaydeep.appspot.com",
messagingSenderId: "923236815008",
appId: "1:923236815008:web:cde360a678d8d78ab2b9c5",
measurementId: "G-1DXR76HRYL"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
