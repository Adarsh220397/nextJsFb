// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// const clientCredentials = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// if (!firebase.getApps.length) {
//     console.log(firebase.getApps.length,'-------')
//   firebase.initializeApp(clientCredentials);
// }

// export default firebase;

// Import the functions you need from the SDKs you need
import  { getApp, initializeApp } from "firebase/app";
import  "firebase/analytics";
import   'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn9owpdUo-t5-Pi-DUDas3VeofQ3dVbu0",
  authDomain: "nextjsdemo-6b2ee.firebaseapp.com",
  projectId: "nextjsdemo-6b2ee",
  storageBucket: "nextjsdemo-6b2ee.appspot.com",
  messagingSenderId: "908331595011",
  appId: "1:908331595011:web:a41199e98455f0c7e9e536",
  measurementId: "G-6GW7SHME1R"
};

const config = {
  apiKey: "AIzaSyA65KBCKkTRkavbox1wYaBoeVO0NqnBN-4",
  authDomain: "newnextjspro.firebaseapp.com",
  projectId: "newnextjspro",
  storageBucket: "newnextjspro.appspot.com",
  messagingSenderId: "1090684077117",
  appId: "1:1090684077117:web:86e5e4bdc4220a112c5654",
  measurementId: "G-JPYC0EML5C"
};
// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
// export const database = getFirestore(app);
// export const auth = getAuth(app);

export const initializeAppIfNecessary = () => {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}
 
 export const app = initializeAppIfNecessary()

 export const initFirebase =() => {
  return app;
 }

 export const auth = getAuth();
 export const db = getFirestore(app)

