import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBTQbl10OVbzoxnveWvbuMTZydQkmcr1lA",
    authDomain: "fir-9-82868.firebaseapp.com",
    projectId: "fir-9-82868",
    storageBucket: "fir-9-82868.appspot.com",
    messagingSenderId: "55305199975",
    appId: "1:55305199975:web:d4fca6b4ad81950c41cfc2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
