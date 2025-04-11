import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Tumhara Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAWzk6l8aY5dzHs3diGBbq_dWg9FsRf4OM",
  authDomain: "jobrashpi.firebaseapp.com",
  projectId: "jobrashpi",
  storageBucket: "jobrashpi.appspot.com",
  messagingSenderId: "851900245292",
  appId: "1:851900245292:web:af3cd6bc51a1c52a68f889",
  measurementId: "G-4K8HKM8HZV",
};

// Firebase App Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Authentication Initialize
const provider = new GoogleAuthProvider(); //hello
export { auth, provider, signInWithPopup };
