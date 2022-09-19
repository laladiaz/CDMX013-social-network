// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { app } from './config.js';

export const db = getFirestore(app);
