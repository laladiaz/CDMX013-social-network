// import { onNavigate } from '../main.js';
import { googleButton } from './googleButton.js';

export const welcome = () => {
  // section welcome
  const sectionWelcome = document.createElement('section');
  sectionWelcome.setAttribute('id', 'register-page');

  // section header
  const headerWelcome = document.createElement('header');
  headerWelcome.setAttribute('class', 'register-header');

  // logo of the welcome page
  const imgLogoWelcome = document.createElement('img');
  imgLogoWelcome.setAttribute('src', './img/Logo-BookNet.png');
  imgLogoWelcome.setAttribute('class', 'logo-booknet');

  // appends img to header
  headerWelcome.appendChild(imgLogoWelcome);

  // main of welcome
  const mainWelcome = document.createElement('main');
  mainWelcome.setAttribute('class', 'register-main');

  // buttons for register and login
  const loginButton = document.createElement('button');
  loginButton.setAttribute('id', 'log-in');
  loginButton.setAttribute('class', 'register-button');
  loginButton.textContent = 'Log In';
  const signupButton = document.createElement('button');
  signupButton.setAttribute('id', 'sign-up');
  signupButton.setAttribute('class', 'register-button');
  signupButton.textContent = 'Sign up';

  // appends the buttons to the main tag
  mainWelcome.append(loginButton, signupButton);

  // adds the buttons for login with email or google
  const loginButtonsDiv = document.createElement('div');
  loginButtonsDiv.setAttribute('class', 'login-buttons-div');
  const emailLoginButton = document.createElement('button');
  emailLoginButton.setAttribute('id', 'email-login-button');
  emailLoginButton.textContent = 'Continue with email';
  const googleLoginButton = document.createElement('div');
  googleLoginButton.setAttribute('id', 'buttonDiv');

  // appends the googleButton module to the google login button
  googleLoginButton.append(googleButton());

  // adds the buttons for login to their div
  loginButtonsDiv.append(emailLoginButton, googleLoginButton);

  // adds dialog and form for a login modal
  const loginModal = document.createElement('dialog');
  loginModal.setAttribute('id', 'login-modal');
  const formLoginModal = document.createElement('form');
  formLoginModal.setAttribute('id', 'form-login-modal');
  const emailLoginInput = document.createElement('input');
  emailLoginInput.setAttribute('type', 'text');
  emailLoginInput.setAttribute('placeholder', 'email');
  emailLoginInput.setAttribute('class', 'login-input');
  const passLoginInput = document.createElement('input');
  passLoginInput.setAttribute('placeholder', 'password');
  passLoginInput.setAttribute('type', 'password');
  passLoginInput.setAttribute('class', 'login-input');
  const cancelLoginButton = document.createElement('button');
  cancelLoginButton.setAttribute('class', 'modal-login-button');
  cancelLoginButton.textContent = 'Back';
  const submitLoginButton = document.createElement('button');
  submitLoginButton.setAttribute('class', 'modal-login-button');
  submitLoginButton.textContent = 'Enter';
  
  // appends the buttons and input text areas to form
  formLoginModal.append(emailLoginInput, passLoginInput, cancelLoginButton, submitLoginButton);

  // appends the form to the dialog tag
  loginModal.appendChild(formLoginModal);

  // appends the dialog to section welcome
  sectionWelcome.appendChild(loginModal);

  // click listener for the emailLoginButton to show the loginModal
  emailLoginButton.addEventListener('click', () => {
    loginModal.showModal();
  });

  cancelLoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.close();
  });

  // appends the header and main to section
  sectionWelcome.append(headerWelcome, mainWelcome, loginButtonsDiv);
  return sectionWelcome;
};
