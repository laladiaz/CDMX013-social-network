// eslint-disable-next-line import/no-unresolved
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { auth } from '../lib/auth.js';
import { onNavigate } from '../main.js';
import {
  savePost, onGetPosts, deletePost, getPost, updatePost, 
} from '../lib/firestore.js';

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
  userImage.setAttribute('class', 'user-image');
  userImage.setAttribute('src', './img/user-image.png');
  const emailUserNewPost = document.createElement('p');
  emailUserNewPost.setAttribute('class', 'email-user-new-post');
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
  countParagraph.textContent = '0/200';
  const errorMessage = document.createElement('p');
  errorMessage.setAttribute('class', 'error-post');
  const divSavePost = document.createElement('div');
  divSavePost.setAttribute('class', 'save-post-div');
  const savePostButton = document.createElement('img');
  savePostButton.setAttribute('class', 'save-post-button');
  savePostButton.setAttribute('src', './img/save-new.png');
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

  divCreatePost.addEventListener('click', () => {
    newPost.showModal();
    const user = auth.currentUser;
    const emailUser = user.email;
    emailUserNewPost.textContent = emailUser;
  }); 

  // create post
  divSavePost.addEventListener('click', () => {
    const hour = Date.now();
    const user = auth.currentUser;
    const emailUser = user.email;
    const like = '';

    if (!inputNewPost.value) {
      errorMessage.textContent = 'You haven\'t write anything';
    } else { 
      savePost(emailUser, inputNewPost.value, hour, like);
      newPost.close();
      inputNewPost.value = '';
      countParagraph.textContent = '0/200';
    }
  });

  divCancelPost.addEventListener('click', () => {
    newPost.close();
    inputNewPost.value = '';
    errorMessage.textContent = '';
    countParagraph.textContent = '0/200';
  });

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

  inputNewPost.addEventListener('keyup', function () {
    counterCharacters(inputNewPost);
    errorMessage.textContent = '';
  });

  divCancelPost.append(cancelPostButton, cancelPostText);
  divUserNewPost.append(userImage, emailUserNewPost);
  divButtonsNewPost.append(divCancelPost, divSavePost);
  divSavePost.append(savePostButton, savePostText);
  newPost.append(divUserNewPost, inputNewPost, countParagraph, errorMessage, divButtonsNewPost);

  const html = (obj, item) => {
    const divLayoutPost = document.createElement('div');
    divLayoutPost.setAttribute('class', 'div-layout-post');
    const divUserPost = document.createElement('div');
    divUserPost.setAttribute('class', 'div-user-post');
    const userImagePost = document.createElement('img');
    userImagePost.setAttribute('class', 'user-image');
    userImagePost.setAttribute('src', './img/user-image.png');
    const emailUserPost = document.createElement('p');
    emailUserPost.textContent = obj.email;
    emailUserPost.setAttribute('class', 'email-user-post');
    const inputPost = document.createElement('p');
    inputPost.setAttribute('class', 'input-post');
    inputPost.readOnly = true;
    inputPost.textContent = obj.text;
    const editPost = document.createElement('img');
    editPost.setAttribute('src', './img/edit.png');
    editPost.setAttribute('class', 'edit-post');
    editPost.dataset.id = item;
    const deletePostOutside = document.createElement('img');
    deletePostOutside.setAttribute('src', './img/delete.png');
    deletePostOutside.setAttribute('class', 'delete-post');
    deletePostOutside.dataset.id = item;
    const likePost = document.createElement('img');
    likePost.setAttribute('class', 'like-post');
    likePost.src = './img/empty-like.png';
    const counterLike = document.createElement('p');
    counterLike.setAttribute('class', 'counter-like');
    counterLike.textContent = '1';
    const divLike = document.createElement('div');
    divLike.setAttribute('class', 'div-like');
    
    divLike.append(likePost, counterLike);
    
    // dialog warning of deletion
    const warningDeletePost = document.createElement('dialog');
    warningDeletePost.setAttribute('class', 'warning-delete');
    const paragraphWarning = document.createElement('p');
    paragraphWarning.setAttribute('class', 'paragraph-warning-delete');
    paragraphWarning.textContent = 'You are about to delete your post';
    const paragraphCheck = document.createElement('p');
    paragraphCheck.setAttribute('class', 'paragraph-check');
    paragraphCheck.textContent = 'Are you sure?';
    const btnContinue = document.createElement('button');
    btnContinue.setAttribute('class', 'btn-continue');
    btnContinue.textContent = 'Continue';
    btnContinue.dataset.id = item;
    const btnCancel = document.createElement('button');
    btnCancel.setAttribute('class', 'btn-cancel');
    btnCancel.textContent = 'Cancel';

    // modal to edit post
    const editPostDialog = document.createElement('dialog');
    editPostDialog.setAttribute('class', 'new-post');
    const divUserEditPost = document.createElement('div');
    divUserEditPost.setAttribute('class', 'div-user-new-post');
    const userImageEditPost = document.createElement('img');
    userImageEditPost.setAttribute('class', 'user-image');
    userImageEditPost.setAttribute('src', './img/user-image.png');
    const emailUserEditPost = document.createElement('p');
    emailUserEditPost.setAttribute('class', 'email-user-new-post');
    const inputEditPost = document.createElement('textarea');
    inputEditPost.setAttribute('class', 'input-new-post');
    inputEditPost.setAttribute('cols', '20');
    inputEditPost.setAttribute('rows', '20');
    inputEditPost.setAttribute('maxlength', '200');
    inputEditPost.spellcheck = true;
    inputEditPost.setAttribute('placeholder', 'share something');
    const countParagraphEditPost = document.createElement('p');
    countParagraphEditPost.setAttribute('class', 'count-paragraph');
    countParagraphEditPost.textContent = `${obj.text.length}/200`;
    const errorMessageEditPost = document.createElement('p');
    errorMessageEditPost.setAttribute('class', 'error-post');
    const divSaveEditPost = document.createElement('div');
    divSaveEditPost.setAttribute('class', 'save-post-div');
    divSaveEditPost.dataset.id = item;
    const saveEditButton = document.createElement('img');
    saveEditButton.setAttribute('class', 'save-post-button');
    saveEditButton.setAttribute('src', './img/save-new.png');
    const saveEditText = document.createElement('p');
    saveEditText.setAttribute('class', 'save-post-text');
    saveEditText.textContent = 'save';
    saveEditButton.dataset.id = item;
    const divCancelEditPost = document.createElement('div');
    divCancelEditPost.setAttribute('class', 'cancel-post');
    const cancelEditPostBtn = document.createElement('img');
    cancelEditPostBtn.setAttribute('class', 'cancel-post-button');
    cancelEditPostBtn.setAttribute('src', './img/cancel.png');
    const cancelEditPostText = document.createElement('p');
    cancelEditPostText.setAttribute('class', 'cancel-post-text');
    cancelEditPostText.textContent = 'cancel';
    const divButtonsEditPost = document.createElement('div');
    divButtonsEditPost.setAttribute('class', 'div-buttons-new-post');

    const counterCharactersEditPost = (text) => {
      const maxLength = 200;
      const strLength = text.value.length;
      if (strLength > maxLength) {
        countParagraphEditPost.textContent = `${strLength}/${maxLength}`;
      } else {
        countParagraphEditPost.textContent = `${strLength}/${maxLength}`;
      }
    };

    divCancelEditPost.append(cancelEditPostBtn, cancelEditPostText);
    divUserEditPost.append(userImageEditPost, emailUserEditPost);
    divSaveEditPost.append(saveEditButton, saveEditText);
    divButtonsEditPost.append(divCancelEditPost, divSaveEditPost);
    editPostDialog.append(divUserEditPost, inputEditPost, countParagraphEditPost, errorMessageEditPost, divButtonsEditPost);
    
    warningDeletePost.append(paragraphWarning, paragraphCheck, btnContinue, btnCancel);
    // apends items to div layout for posts
    divUserPost.append(userImagePost, emailUserPost);

    const user = auth.currentUser;
    if (user.email === obj.email) {
      divLayoutPost.append(editPost, editPostDialog, deletePostOutside, warningDeletePost, divUserPost, inputPost, divLike);
      deletePostOutside.addEventListener('click', () => {
        warningDeletePost.showModal();
        // function delete
        btnContinue.addEventListener('click', (e) => {
          deletePost(e.target.dataset.id);
          warningDeletePost.close();
        });

        btnCancel.addEventListener('click', () => (warningDeletePost.close()));
      });
      
      // function edit
      editPost.addEventListener('click', async (e) => {
        editPostDialog.showModal();
        const dataEdit = await getPost(e.target.dataset.id);
        const postToEdit = dataEdit.data();
        inputEditPost.textContent = postToEdit.text;
        emailUserEditPost.textContent = postToEdit.email;
      });

      divSaveEditPost.addEventListener('click', (e) => {
        if (inputEditPost.value) {
          updatePost(e.target.dataset.id, { text: inputEditPost.value });
          editPostDialog.close();
        } else {
          errorMessageEditPost.textContent = 'Please write something';
        }
      }); 

      inputEditPost.addEventListener('keyup', function () {
        counterCharactersEditPost(inputEditPost);
        errorMessageEditPost.textContent = '';
      });

      divCancelEditPost.addEventListener('click', () => {
        editPostDialog.close();
      }); 
    } else {
      divLayoutPost.append(divUserPost, inputPost, divLike);
    }
    
    sectionPosts.append(divLayoutPost);
  };

  /* const editEveryPost = document.getElementsByClassName('edit-post');
  console.log(editEveryPost); */

  // render posts in home
  onGetPosts((querySnapshot) => {
    while (sectionPosts.firstChild) {
      sectionPosts.removeChild(sectionPosts.firstChild);
    }
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const postId = doc.id;
      html(post, postId);
    });
  });

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
    if (!user) {
      onNavigate('/');
    } 
  });

  imageUserNav.addEventListener('click', () => {
    onNavigate('/profile');
  });

  mainHome.append(sectionPosts, newPost);

  sectionHome.append(headerHome, mainHome, navMenu); 
  return sectionHome;
};
