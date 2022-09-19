// eslint-disable-next-line import/no-unresolved
// import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { auth } from '../lib/auth.js';
import { onNavigate } from '../main.js';

export const home = () => {
  const sectionHome = document.createElement('section');
  sectionHome.setAttribute('class', 'section');

  // Header of home
  const headerHome = document.createElement('header');
  headerHome.setAttribute('class', 'header-home');
  // div for logo and home title
  const divLogo = document.createElement('div');
  divLogo.setAttribute('class', 'div-logo');
  const logoB = document.createElement('img');
  logoB.setAttribute('src', './img/Logo-B.png');
  logoB.setAttribute('class', 'logoB-header');
  const titleHeader = document.createElement('h2');
  titleHeader.setAttribute('class', 'title-header');
  titleHeader.textContent = 'HOME';

  divLogo.append(logoB, titleHeader);

  // div for create post
  const divCreatePost = document.createElement('div');
  divCreatePost.setAttribute('class', 'div-create-post');
  const imageCreatePost = document.createElement('img');
  imageCreatePost.setAttribute('src', './img/new-post.png');
  imageCreatePost.setAttribute('class', 'image-create-post');
  const titleCreatePost = document.createElement('p');
  titleCreatePost.setAttribute('class', 'title-create-post');
  titleCreatePost.textContent = 'share something';

  divCreatePost.append(imageCreatePost, titleCreatePost);

  headerHome.append(divLogo, divCreatePost);

  // section main
  const mainHome = document.createElement('main');
  mainHome.setAttribute('class', 'home-main');
  const sectionPosts = document.createElement('section');
  sectionPosts.setAttribute('class', 'section-posts');

  // modal post
  const newPost = document.createElement('dialog');
  newPost.setAttribute('class', 'new-post');
  const divUserNewPost = document.createElement('div');
  divUserNewPost.setAttribute('class', 'div-user-new-post');
  const userImage = document.createElement('img');
  userImage.setAttribute('src', './img/user.png');
  const emailUserNewPost = document.createElement('p');
  emailUserNewPost.setAttribute('class', 'email-user-new-post');
  emailUserNewPost.textContent = '';
  const inputNewPost = document.createElement('input');
  inputNewPost.setAttribute('class', 'input-new-post');
  inputNewPost.setAttribute('type', 'text');
  inputNewPost.setAttribute('placeholder', 'share something');
  const divSavePost = document.createElement('div');
  divSavePost.setAttribute('class', 'save-post-div');
  const savePostButton = document.createElement('button');
  savePostButton.setAttribute('class', 'save-post-button');
  const savePostText = document.createElement('p');
  savePostText.setAttribute('class', 'save-post-text');
  savePostText.textContent = 'save';
  const divCancelPost = document.createElement('div');
  divCancelPost.setAttribute('class', 'cancel-post');
  const cancelPostButton = document.createElement('button');
  cancelPostButton.setAttribute('class', 'cancel-post-button');
  const cancelPostText = document.createElement('p');
  cancelPostText.setAttribute('class', 'cancel-post-text');
  cancelPostText.textContent = 'cancel';
  const divButtonsNewPost = document.createElement('div');
  divButtonsNewPost.setAttribute('class', 'div-buttons-new-post');

  divCancelPost.append(cancelPostButton, cancelPostText);
  divUserNewPost.append(userImage, emailUserNewPost);
  divButtonsNewPost.append(divCancelPost, divSavePost);
  divSavePost.append(savePostButton, savePostText);
  newPost.append(divUserNewPost, inputNewPost, divButtonsNewPost);

  // nav menu
  const navMenu = document.createElement('nav');
  navMenu.setAttribute('class', 'nav-menu');
  const indicatorDiv = document.createElement('div');
  indicatorDiv.setAttribute('class', 'indicator-div');
  const imageHomeNav = document.createElement('img');
  imageHomeNav.setAttribute('src', './img/home.png');
  imageHomeNav.setAttribute('class', 'image-home-nav');
  const dotIndicator = document.createElement('img');
  dotIndicator.setAttribute('src', './img/dot.png');
  dotIndicator.setAttribute('class', 'dot-indicator');
  const imageSearchNav = document.createElement('img');
  imageSearchNav.setAttribute('src', './img/search.png');
  imageSearchNav.setAttribute('class', 'image-search-nav');
  const imageUserNav = document.createElement('img');
  imageUserNav.setAttribute('src', './img/user.png');
  imageUserNav.setAttribute('class', 'image-profile-nav');

  indicatorDiv.append(imageHomeNav, dotIndicator);

  navMenu.append(indicatorDiv, imageSearchNav, imageUserNav);

  /* onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user login', user.email);
    } else {
      onNavigate('/');
    }
  }); */

  imageUserNav.addEventListener('click', () => {
    onNavigate('/profile');
  });

  // const user = auth.currentUser;
  
  console.log(auth); 

  divCreatePost.addEventListener('click', () => {
    newPost.showModal();
    const user = auth.currentUser;
    if (user) {
      emailUserNewPost.innerHTML = user.email;
    } 
  }); 

  mainHome.append(sectionPosts, navMenu, newPost);

  sectionHome.append(headerHome, mainHome); 
  return sectionHome;
};
