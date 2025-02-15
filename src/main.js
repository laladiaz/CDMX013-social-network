import { login } from './components/login.js';
import { signup } from './components/signup.js';
import { welcome } from './components/welcome.js';
import { home } from './components/home.js';
import { profile } from './components/profile.js';

// define root as the div root written in index.html
const root = document.getElementById('root');
// define the object routes for routing
const routes = {
  '/': welcome,
  '/login': login,
  '/signup': signup,
  '/home': home,
  '/profile': profile,
};
export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.removeChild(root.firstChild);
  root.appendChild(routes[pathname]());
};

const component = routes[window.location.pathname];
window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(component());
};

root.appendChild(component());
