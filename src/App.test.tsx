import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(
    /React useReducer and useContext example Poker App/i
  );
  expect(linkElement).toBeInTheDocument();
});
