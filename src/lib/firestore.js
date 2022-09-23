import {
  getFirestore, collection, addDoc, onSnapshot, query, orderBy,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { app } from './config.js';

export const db = getFirestore(app);

// const postCollection = collection(db, 'posts');

// add to the posts collection
export const savePost = (email, text, time) => addDoc(collection(db, 'posts'), { email, text, time });

// to fetch the posts collection
const orderPost = query(collection(db, 'posts'), orderBy('time', 'desc'));
export const onGetPosts = (callback) => onSnapshot(orderPost, callback); 
