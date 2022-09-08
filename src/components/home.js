export const home = () => {
  const sectionHome = document.createElement('section');
  const homeTitle = document.createElement('h2');
  homeTitle.textContent = 'Home';
  sectionHome.appendChild(homeTitle);
  return sectionHome;
};
