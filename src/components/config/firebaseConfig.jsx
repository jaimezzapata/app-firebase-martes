import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAyNH2WiPputZn5ehA5TwWfUUhyVG_4DpU",
  authDomain: "app-firebase-martes-jzv.firebaseapp.com",
  projectId: "app-firebase-martes-jzv",
  storageBucket: "app-firebase-martes-jzv.appspot.com",
  messagingSenderId: "1085568341646",
  appId: "1:1085568341646:web:69dec805f76df9c3591bdf"
};
const app = initializeApp(firebaseConfig);
export const initFirestore = getFirestore(app);
export const initStorage = getStorage(app);
