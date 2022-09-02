import { signup } from './components/signup.js';
import { welcome } from './components/welcome.js';
// define root as the div root written in index.html
const root = document.getElementById('root');
// define the object routes for routing
const routes = {
  '/': welcome,
  '/signup': signup,
};
export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.appendChild(routes[pathname]());
};

const component = routes[window.location.pathname];
root.appendChild(component());
