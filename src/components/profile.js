/* eslint-disable import/no-unresolved */
import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { onNavigate } from '../main.js';
import { auth } from '../lib/auth.js';
import {
  onGetPosts, getPost, updatePost, deletePost, 
} from '../lib/firestore.js';

export const profile = () => {
  const sectionProfile = document.createElement('section');
  sectionProfile.setAttribute('class', 'section');
  
  // Header of Profile
  const headerProfile = document.createElement('header');
  headerProfile.setAttribute('class', 'header-profile');
  // div for logo and Profile title
  const divLogo = document.createElement('div');
  divLogo.setAttribute('class', 'div-logo');
  const logoB = document.createElement('img');
  logoB.setAttribute('src', './img/Logo-B.png');
  logoB.setAttribute('class', 'logoB-header');
  const titleHeader = document.createElement('h2');
  titleHeader.setAttribute('class', 'title-header');
  titleHeader.textContent = 'PROFILE';
  
  divLogo.append(logoB, titleHeader);
  
  // div for create post
  const divProfileBody = document.createElement('div');
  divProfileBody.setAttribute('class', 'div-profile-body');
  const imageSettingsProfile = document.createElement('img');
  imageSettingsProfile.setAttribute('src', './img/settings.png');
  imageSettingsProfile.setAttribute('class', 'image-settings-profile');
  const titleSettingsProfile = document.createElement('p');
  titleSettingsProfile.setAttribute('class', 'title-settings-profile');
  titleSettingsProfile.textContent = 'settings';

  // dropdown menu for setting
  const dialogSetting = document.createElement('dialog');
  dialogSetting.setAttribute('class', 'dialog-settings');
  // logout img
  const divLogoutImg = document.createElement('div');
  divLogoutImg.setAttribute('class', 'div-logout-img');
  const logoutImg = document.createElement('img');
  logoutImg.setAttribute('src', './img/logout.png');
  logoutImg.setAttribute('class', 'logout-img');
  const logoutTitle = document.createElement('p');
  logoutTitle.setAttribute('class', 'logout-title');
  logoutTitle.textContent = 'Log Out';
  // edit profile
  const divEditProfile = document.createElement('div');
  divEditProfile.setAttribute('class', 'div-edit-profile');
  const editImg = document.createElement('img');
  editImg.setAttribute('src', './img/edit.png');
  editImg.setAttribute('class', 'edit-img');
  const editTitle = document.createElement('p');
  editTitle.setAttribute('class', 'edit-title');
  editTitle.textContent = 'Edit';
  const closeSettings = document.createElement('p');
  closeSettings.setAttribute('class', 'close-settings');
  closeSettings.textContent = 'X';
  
  // appends items to div
  divLogoutImg.append(logoutImg, logoutTitle);
  divEditProfile.append(editImg, editTitle);
  // appends divs to div settings
  dialogSetting.append(divEditProfile, divLogoutImg, closeSettings);

  divProfileBody.addEventListener('click', () => {
    dialogSetting.show();
  });
  closeSettings.addEventListener('click', () => {
    dialogSetting.close();
  });

  divLogoutImg.addEventListener('click', () => {
    signOut(auth).then(() => {
      onNavigate('/');
    });
  });
  
  divProfileBody.append(imageSettingsProfile, titleSettingsProfile);
  
  headerProfile.append(divLogo, divProfileBody);
  
  // section main
  const mainProfile = document.createElement('main');
  mainProfile.setAttribute('class', 'profile-main');

  // secction main of profile where the post from the user will be seen
  const sectionProfileMain = document.createElement('section');
  sectionProfileMain.setAttribute('class', 'section-profile-main');

  // nav bar to go to other pages
  const navMenu = document.createElement('nav');
  navMenu.setAttribute('class', 'nav-menu');

  // img to go to other pages
  const imageHomeNav = document.createElement('img');
  imageHomeNav.setAttribute('src', './img/home.png');
  imageHomeNav.setAttribute('class', 'image-home-nav');
  const imageUserNav = document.createElement('img');
  imageUserNav.setAttribute('src', './img/user.png');
  imageUserNav.setAttribute('class', 'image-profile-nav');
  // indicator: where you at
  const indicatorDiv = document.createElement('div');
  indicatorDiv.setAttribute('class', 'indicator-div');
  const dotIndicator = document.createElement('img');
  dotIndicator.setAttribute('src', './img/dot.png');
  dotIndicator.setAttribute('class', 'dot-indicator');
  
  indicatorDiv.append(imageUserNav, dotIndicator);
  
  navMenu.append(imageHomeNav, indicatorDiv);

  // user div
  const divProfileUser = document.createElement('div');
  divProfileUser.setAttribute('class', 'div-user-profile');
  const userImage = document.createElement('img');
  userImage.setAttribute('class', 'user-image-profile');
  userImage.setAttribute('src', './img/user-image.png');
  const emailUser = document.createElement('p');
  emailUser.setAttribute('class', 'email-user-profile');
  emailUser.textContent = 'profile email';

  divProfileUser.append(userImage, emailUser);

  // post div
  const sectionPosts = document.createElement('section');
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

    divUserPost.append(userImagePost, emailUserPost);

    divLayoutPost.append(editPost, editPostDialog, deletePostOutside, warningDeletePost, divUserPost, inputPost);

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

    sectionPosts.append(divLayoutPost);
  };

  onGetPosts((querySnapshot) => {
    while (sectionPosts.firstChild) {
      sectionPosts.removeChild(sectionPosts.firstChild);
    }
    querySnapshot.forEach((doc) => {
      const user = auth.currentUser;
      const post = doc.data();
      const postId = doc.id;
      if (user.email === post.email) {
        html(post, postId);
      }
    });
  });
  sectionProfileMain.append(divProfileUser, sectionPosts);

  // posts user
  
  mainProfile.append(dialogSetting, sectionProfileMain);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      onNavigate('/');
    } else {
      emailUser.textContent = user.email;
    }
  });
  
  imageHomeNav.addEventListener('click', () => {
    onNavigate('/home');
  });
  
  sectionProfile.append(headerProfile, mainProfile, navMenu); 
  return sectionProfile;
};
