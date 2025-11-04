/* eslint-disable prettier/prettier */
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgwaUc_fsk9zfpMAKv1HvUlFv22Idhrl8",
  authDomain: "egeszseghazpesterzsebet.firebaseapp.com",
  databaseURL: "https://egeszseghazpesterzsebet-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "egeszseghazpesterzsebet",
  storageBucket: "egeszseghazpesterzsebet.appspot.com",
  messagingSenderId: "220968774410",
  appId: "1:220968774410:web:2f270bfb3289390fb8a8f3",
  measurementId: "G-BJH2GNPBCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);