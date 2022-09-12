import { onNavigate } from '../main.js';

export const profile = () => {
  const sectionProfile = document.createElement('section');
  
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
  const imageSearchNav = document.createElement('img');
  imageSearchNav.setAttribute('src', './img/search.png');
  imageSearchNav.setAttribute('class', 'image-search-nav');
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
  
  navMenu.append(imageHomeNav, imageSearchNav, indicatorDiv);
  
  mainProfile.append(sectionProfileMain, navMenu);

  imageHomeNav.addEventListener('click', () => {
    onNavigate('/home');
  });
  
  sectionProfile.append(headerProfile, mainProfile); 
  return sectionProfile;
};
