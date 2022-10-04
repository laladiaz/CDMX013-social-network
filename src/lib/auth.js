import {
  // eslint-disable-next-line max-len
  getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, provider,
// eslint-disable-next-line import/no-unresolved
} from './imports.js';
import { app } from './config.js';

export const auth = getAuth(app);

// export const provider = new GoogleAuthProvider();

// eslint-disable-next-line max-len
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const popupGoogle = () => signInWithPopup(auth, provider);

// eslint-disable-next-line max-len
export const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
