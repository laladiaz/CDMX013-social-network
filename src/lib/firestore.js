import {
  getFirestore, collection, addDoc, onSnapshot, 
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { app } from './config.js';

export const db = getFirestore(app);

// add to the posts collection
export const savePost = (text) => addDoc(collection(db, 'posts'), { text });

// to fetch the posts collection
// export const getPosts = () => getDocs(db, 'posts');
export const onGetPosts = (callback) => onSnapshot(collection(db, 'posts'), callback); 
