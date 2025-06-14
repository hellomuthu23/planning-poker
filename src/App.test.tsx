import { render, screen } from '@testing-library/react';
import App from './App';
jest.mock('./service/players');
jest.mock('./service/games');
jest.mock('./repository/firebase');

// eslint-disable-next-line jest/valid-describe-callback

jest.mock('country-flag-emoji-polyfill', () => ({
  polyfillCountryFlagEmojis: jest.fn(),
}));

describe('App', () =>
  it('Should display toolbar with header', () => {
    render(<App />);
    const toolBarHeader = screen.getByText('Planning Poker');
    expect(toolBarHeader).toBeInTheDocument();
  }));
