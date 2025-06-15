// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en/translation.json'; // adjust the path as needed

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

i18n.use(initReactI18next).init({
  lng: 'en', // set your default language here
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
  },
  interpolation: { escapeValue: false },
});
