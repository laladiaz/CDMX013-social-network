import { signup } from '../src/components/signup.js';
import { welcome } from '../src/components/welcome.js';
import { login } from '../src/components/login.js';
import { home } from '../src/components/home.js';
import { profile } from '../src/components/profile.js';

/** @jest-environment jsdom */

jest.mock('../src/main.js');
jest.mock('../src/lib/imports.js');

describe('welcome tests', () => {
  test('is welcome a function?', () => {
    expect(typeof welcome).toBe('function');
  });
  test('snapshot from welcome', () => {  
    expect(welcome()).toMatchSnapshot();
  });
  test('login button is not null', () => {
    const element = welcome();
    const loginButton = element.querySelector('#log-in');
    expect(loginButton).not.toBeNull();
  });
  test('signup button is not null', () => {
    const element = welcome();
    const signupButton = element.querySelector('#sign-up');
    expect(signupButton).not.toBeNull();
  });
});

describe('signup tests', () => {
  test('is signup a function?', () => {
    expect(typeof signup).toBe('function');
  });
  test('snapshot from signup', () => {  
    expect(signup()).toMatchSnapshot();
  });
  test('back button is not null', () => {
    const element = signup();
    const backButton = element.querySelector('.modal-button');
    expect(backButton).not.toBeNull();
  });
});

describe('login tests', () => {
  test('is login a function?', () => {
    expect(typeof login).toBe('function');
  });
  test('snapshot from signup', () => {  
    expect(login()).toMatchSnapshot();
  });
  test('back button is not null', () => {
    const element = login();
    const backButton = element.querySelector('.modal-button');
    expect(backButton).not.toBeNull();
  });
});

describe('home tests', () => {
  test('is home a function?', () => {
    expect(typeof home).toBe('function');
  });
  test('snapshot from home', () => {  
    expect(home()).toMatchSnapshot();
  });
  test('create post button is not null', () => {
    const element = home();
    const createPost = element.querySelector('.div-create-post');
    expect(createPost).not.toBeNull();
  });
  test('profile button is not null', () => {
    const element = home();
    const profileButton = element.querySelector('.image-profile-nav');
    expect(profileButton).not.toBeNull();
  });
});

describe('profile tests', () => {
  test('is profile a function?', () => {
    expect(typeof profile).toBe('function');
  });
  test('config button is not null', () => {
    const element = profile();
    const configButton = element.querySelector('.div-profile-body');
    expect(configButton).not.toBeNull();
  });
  test('home button is not null', () => {
    const element = profile();
    const homeButton = element.querySelector('.image-home-nav');
    expect(homeButton).not.toBeNull();
  });
});
