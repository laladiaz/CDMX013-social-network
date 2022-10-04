import { GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
export {
  getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
export { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
export {
  getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, getDoc, updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';

export const provider = new GoogleAuthProvider();
