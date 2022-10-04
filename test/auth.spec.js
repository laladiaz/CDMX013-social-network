import { signup } from '../src/components/signup.js';

/**
 * jest-enviroment jsdom
 */

jest.mock('../src/main.js');
jest.mock('../src/lib/imports.js');

describe('signup tests', () => {
  test('is signup a function?', () => {
    expect(typeof signup).toBe('function');
  });
});
