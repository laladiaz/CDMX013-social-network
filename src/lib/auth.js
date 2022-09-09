// eslint-disable-next-line import/no-unresolved
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { app } from './config.js';

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
