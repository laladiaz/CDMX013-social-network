import { onNavigate } from '../main.js';

export const welcome = () => {
  // section welcome
  const sectionWelcome = document.createElement('section');
  sectionWelcome.setAttribute('class', 'section');

  // section header
  const headerWelcome = document.createElement('header');
  headerWelcome.setAttribute('class', 'welcome-header');

  // logo of the welcome page
  const imgLogoWelcome = document.createElement('img');
  imgLogoWelcome.setAttribute('src', './img/Logo-BookNet.png');
  imgLogoWelcome.setAttribute('class', 'logo-booknet');

  // appends img to header
  headerWelcome.appendChild(imgLogoWelcome);

  // main of welcome
  const mainWelcome = document.createElement('main');
  mainWelcome.setAttribute('class', 'welcome-main');

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

  // footer
  const footerWelcome = document.createElement('footer');
  footerWelcome.setAttribute('class', 'footer-welcome');
  footerWelcome.textContent = '©️2022 Jean y Lala';

  // adds event listener to login and signup buttons
  loginButton.addEventListener('click', () => {
    onNavigate('/login');  
  });
  signupButton.addEventListener('click', () => {
    onNavigate('/signup');  
  });

  // appends the header and main to section
  sectionWelcome.append(headerWelcome, mainWelcome, footerWelcome);
  return sectionWelcome;
};
