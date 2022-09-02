// import { onNavigate } from '../main.js';
import { googleButton } from './googleButton.js';

export const login = () => {
  // section login
  const sectionLogin = document.createElement('section');
  sectionLogin.setAttribute('id', 'login-page');

  // section header
  const headerLogin = document.createElement('header');
  headerLogin.setAttribute('class', 'login-header');

  // logo of the login page
  const imgLogoLogin = document.createElement('img');
  imgLogoLogin.setAttribute('src', './img/Logo-BookNet.png');
  imgLogoLogin.setAttribute('class', 'logo-booknet');

  // appends img to header
  headerLogin.appendChild(imgLogoLogin);

  // main of login
  const mainLogin = document.createElement('main');
  mainLogin.setAttribute('class', 'login-main');

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
  loginModal.setAttribute('class', 'login-modal');
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

  // appends the modal and buttons to main
  mainLogin.append(loginButtonsDiv, loginModal);

  // click listener for the emailLoginButton to show the loginModal
  emailLoginButton.addEventListener('click', () => {
    sectionLogin.appendChild(loginModal);
  });
  sectionLogin.append(headerLogin, mainLogin);
  return sectionLogin;
};
