// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock the 'react-i18next' module globally for all tests
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: jest.fn(), i18n: { language: 'en-US', changeLanguage: jest.fn() } }),
}));
