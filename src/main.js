import { welcome } from './components/welcome.js';
// define root as the div root written in index.html
const root = document.getElementById('root');
// define the object routes for routing
/* const routes = {
  '/': welcome,
}; */
root.appendChild(welcome());
