// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { app } from './config.js';
import { onNavigate } from '../main.js';

export const auth = getAuth(app);

// email sign in authentication
export const createUser = (a, x, y) => {
  createUserWithEmailAndPassword(a, x, y)  
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log(user);
      onNavigate('/home');
      // ...
    });
  console.log(x, y);
};

/* export const emailAuth = () => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    // ..
    });
}; */ 
