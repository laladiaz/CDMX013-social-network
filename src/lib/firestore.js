import {
  getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, getDoc, updateDoc,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { app } from './config.js';

export const db = getFirestore(app);

// const postCollection = collection(db, 'posts');

// add to the posts collection
export const savePost = (email, text, time, like) => addDoc(collection(db, 'posts'), { email, text, time, like });

// to fetch the posts collection
const orderPost = query(collection(db, 'posts'), orderBy('time', 'desc'));

export const onGetPosts = (callback) => onSnapshot(orderPost, callback); 

export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

export const getPost = (id) => getDoc(doc(db, 'posts', id));

export const updatePost = (id, text) => updateDoc(doc(db, 'posts', id), text);
