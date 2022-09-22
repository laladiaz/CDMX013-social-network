// eslint-disable-next-line import/no-unresolved
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { auth } from '../lib/auth.js';
import { onNavigate } from '../main.js';
import { savePost, onGetPosts } from '../lib/firestore.js';

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
  const divLayoutPost = document.createElement('div');
  divLayoutPost.setAttribute('class', 'div-layout-post');
  const divUserPost = document.createElement('div');
  divUserPost.setAttribute('class', 'div-user-post');
  const userImagePost = document.createElement('img');
  userImagePost.setAttribute('class', 'user-image');
  userImagePost.setAttribute('src', './img/user-image.png');
  const emailUserPost = document.createElement('p');
  emailUserPost.textContent = 'la_espacial@yahoo.com';
  emailUserPost.setAttribute('class', 'email-user-post');
  const inputPost = document.createElement('textarea');
  inputPost.setAttribute('class', 'input-post');
  inputPost.setAttribute('cols', '20');
  inputPost.setAttribute('rows', '20');
  inputPost.readOnly = true;

  // apends items to div layout for posts
  divUserPost.append(userImagePost, emailUserPost);
  divLayoutPost.append(divUserPost, inputPost);
  sectionPosts.append(divLayoutPost);

  // modal post
  const newPost = document.createElement('dialog');
  newPost.setAttribute('class', 'new-post');
  const divUserNewPost = document.createElement('div');
  divUserNewPost.setAttribute('class', 'div-user-new-post');
  const userImage = document.createElement('img');
  userImage.setAttribute('class', 'user-image');
  userImage.setAttribute('src', './img/user-image.png');
  const emailUserNewPost = document.createElement('p');
  emailUserNewPost.setAttribute('class', 'email-user-new-post');
  const inputNewPost = document.createElement('textarea');
  inputNewPost.setAttribute('class', 'input-new-post');
  inputNewPost.setAttribute('cols', '20');
  inputNewPost.setAttribute('rows', '20');
  inputNewPost.setAttribute('maxlength', '200');
  inputNewPost.spellcheck = true;
  inputNewPost.setAttribute('placeholder', 'share something');
  const countParagraph = document.createElement('p');
  countParagraph.setAttribute('class', 'count-paragraph');
  const divSavePost = document.createElement('div');
  divSavePost.setAttribute('class', 'save-post-div');
  const savePostButton = document.createElement('img');
  savePostButton.setAttribute('class', 'save-post-button');
  savePostButton.setAttribute('src', './img/save.png');
  const savePostText = document.createElement('p');
  savePostText.setAttribute('class', 'save-post-text');
  savePostText.textContent = 'save';
  const divCancelPost = document.createElement('div');
  divCancelPost.setAttribute('class', 'cancel-post');
  const cancelPostButton = document.createElement('img');
  cancelPostButton.setAttribute('class', 'cancel-post-button');
  cancelPostButton.setAttribute('src', './img/cancel.png');
  const cancelPostText = document.createElement('p');
  cancelPostText.setAttribute('class', 'cancel-post-text');
  cancelPostText.textContent = 'cancel';
  const divButtonsNewPost = document.createElement('div');
  divButtonsNewPost.setAttribute('class', 'div-buttons-new-post');

  // counter for the number of characters written
  const counterCharacters = (text) => {
    const maxLength = 200;
    const strLength = text.value.length;
    if (strLength > maxLength) {
      countParagraph.textContent = `${strLength}/${maxLength}`;
    } else {
      countParagraph.textContent = `${strLength}/${maxLength}`;
    }
  };

  // eslint-disable-next-line prefer-arrow-callback
  inputNewPost.addEventListener('keyup', function () {
    counterCharacters(inputNewPost);
  });

  divCancelPost.append(cancelPostButton, cancelPostText);
  divUserNewPost.append(userImage, emailUserNewPost);
  divButtonsNewPost.append(divCancelPost, divSavePost);
  divSavePost.append(savePostButton, savePostText);
  newPost.append(divUserNewPost, inputNewPost, countParagraph, divButtonsNewPost);

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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      onGetPosts((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          console.log(post);
        });
      });
    } else {
      onNavigate('/');
    }
  });

  imageUserNav.addEventListener('click', () => {
    onNavigate('/profile');
  });

  divCreatePost.addEventListener('click', () => {
    newPost.showModal();
    const user = auth.currentUser;
    if (user) {
      emailUserNewPost.textContent = user.email;
    }  
  }); 

  // create post
  divSavePost.addEventListener('click', () => {
    const user = auth.currentUser;
    let emailUser = '';
    if (user) {
      emailUser = user.email;
    }  
    console.log('esta es una prueba email user', emailUser);
    // inputNewPost emailUserNewPost
    savePost(emailUser, inputNewPost.value);
    newPost.close();
  });

  divCancelPost.addEventListener('click', () => {
    newPost.close();
  });

  mainHome.append(sectionPosts, navMenu, newPost);

  sectionHome.append(headerHome, mainHome); 
  return sectionHome;
};
