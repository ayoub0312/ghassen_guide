// Firebase Configuration
// Project: ghassen-a125f

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7IuFDT25KbshhJV15Z33X3ZBVTBaQU2A",
    authDomain: "ghassen-a125f.firebaseapp.com",
    projectId: "ghassen-a125f",
    storageBucket: "ghassen-a125f.firebasestorage.app",
    messagingSenderId: "244453072294",
    appId: "1:244453072294:web:919139bfb6a1eed4ed0367",
    measurementId: "G-8XP1GYGT55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
