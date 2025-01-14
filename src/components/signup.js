import { onNavigate } from '../main.js';
import { createUser, popupGoogle } from '../lib/auth.js';

export const signup = () => {
  const sectionSignup = document.createElement('section');
  sectionSignup.setAttribute('class', 'section');

  // section signup header
  const headerSignup = document.createElement('header');
  headerSignup.setAttribute('class', 'register-header');

  // login label
  const Signuplabel = document.createElement('div');
  Signuplabel.setAttribute('class', 'header-label');
  Signuplabel.textContent = 'Sign Up';

  // logo of the welcome page
  const imgLogoSignup = document.createElement('img');
  imgLogoSignup.setAttribute('src', './img/Logo-BookNet.png');
  imgLogoSignup.setAttribute('class', 'logo-booknet');

  // appends img to header
  headerSignup.append(imgLogoSignup);

  // main of signup
  const mainSignup = document.createElement('main');
  mainSignup.setAttribute('class', 'register-main');

  // adds the buttons for signup with email or google
  const signupButtonsDiv = document.createElement('div');
  signupButtonsDiv.setAttribute('class', 'register-buttons-div');
  const emailSignupButton = document.createElement('button');
  emailSignupButton.setAttribute('id', 'email-button');
  const googleSignupButton = document.createElement('button');
  googleSignupButton.setAttribute('id', 'google-button');

  // adds the back button
  const backButton = document.createElement('button');
  backButton.setAttribute('class', 'modal-button');
  backButton.setAttribute('id', 'backButtonSignup');
  backButton.textContent = ('Back');

  // adds the paragrapgh for terms and privacy policy
  const paragraphTerms = document.createElement('p');
  paragraphTerms.setAttribute('class', 'paragraph-terms');
  paragraphTerms.textContent = 'By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.';

  // appends the signup div in main
  mainSignup.appendChild(signupButtonsDiv);

  // adds the buttons for signup to their div
  signupButtonsDiv.append(backButton, paragraphTerms, emailSignupButton, googleSignupButton);

  // adds dialog and form for a signup modal
  const signupModal = document.createElement('dialog');
  signupModal.setAttribute('class', 'signup-modal');
  const formSignupModal = document.createElement('form');
  formSignupModal.setAttribute('id', 'form-signup-modal');
  const emailSignupInput = document.createElement('input');
  emailSignupInput.setAttribute('type', 'email');
  emailSignupInput.setAttribute('placeholder', 'email');
  emailSignupInput.setAttribute('class', 'signup-input');
  const passSignupInput = document.createElement('input');
  passSignupInput.setAttribute('placeholder', 'password');
  passSignupInput.setAttribute('type', 'password');
  passSignupInput.setAttribute('class', 'signup-input');
  const cancelSignupButton = document.createElement('button');
  cancelSignupButton.setAttribute('class', 'modal-button');
  cancelSignupButton.setAttribute('id', 'cancel-signup-modal');
  cancelSignupButton.textContent = 'Back';
  const submitSignupButton = document.createElement('button');
  submitSignupButton.setAttribute('class', 'modal-button');
  submitSignupButton.setAttribute('id', 'submit-signup-modal');
  submitSignupButton.textContent = 'Enter';

  // create paragrapho to show the error
  const paragraphError = document.createElement('p');
  paragraphError.setAttribute('class', 'error-paragraph');

  // appends the buttons and input text areas to form
  // eslint-disable-next-line max-len
  formSignupModal.append(emailSignupInput, passSignupInput, paragraphError, cancelSignupButton, submitSignupButton);

  // appends the form to the dialog tag
  signupModal.appendChild(formSignupModal);

  // appends the dialog to signup section
  mainSignup.appendChild(signupModal);

  // click listener  for the back button
  backButton.addEventListener('click', () => {
    onNavigate('/');
  });

  // click lister to login with google account
  googleSignupButton.addEventListener('click', () => {
    popupGoogle()
      .then(() => {
        onNavigate('/home');
      });
  });

  // click listener for the emailLoginButton to show the loginModal
  emailSignupButton.addEventListener('click', () => {
    signupModal.showModal();
  }); 

  cancelSignupButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.close();
  }); 

  submitSignupButton.addEventListener('click', (e) => {
    e.preventDefault();
    const signupEmail = emailSignupInput.value;
    const signupPassword = passSignupInput.value;

    createUser(signupEmail, signupPassword)
      .then(() => {
        onNavigate('/home');
      })
      .catch((error) => {
        const invalidEmail = 'Please enter a valid email';
        const usedEmail = 'Email already in use, please Log In';
        const missingEmail = 'Please write an email'; 
        const shortPassword = 'Password should be at least 6 characters';
  
        if (error.code === 'auth/invalid-email') {
          paragraphError.innerText = invalidEmail;
        } else if (error.code === 'auth/email-already-in-use') {
          paragraphError.innerText = usedEmail;
        } else if (error.code === 'auth/missing-email') {
          paragraphError.innerText = missingEmail;
        } else if (error.code === 'auth/weak-password') {
          paragraphError.innerText = shortPassword;
        }
      });
  });

  sectionSignup.append(Signuplabel, headerSignup, mainSignup);
  return sectionSignup;
};
