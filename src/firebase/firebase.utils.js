import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { getAuth, signInWithPopup, signInWithEmailAndPassword , GoogleAuthProvider } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyB0Fp_R4T6zg5J5a6bfBMgbQBVSqq6IE9M",
  authDomain: "practice-db-516f6.firebaseapp.com",
  projectId: "practice-db-516f6",
  storageBucket: "practice-db-516f6.appspot.com",
  messagingSenderId: "828706008139",
  appId: "1:828706008139:web:3cba5d517d3d569e9ef1ce",
  measurementId: "G-HWW008WLCN"
};


const app = initializeApp(config);
export const db = getFirestore(app);

export const auth = getAuth();


const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  console.log('createUserProfileDocument....................');
  console.log(userAuth);
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const userSnap = await getDoc(userRef);

  console.log(userSnap);
  console.log(!userSnap.data());

  if (!userSnap.data()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error);
    }
  }

  return userRef;
};

