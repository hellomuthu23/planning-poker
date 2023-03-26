import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
jest.mock('./service/players');
jest.mock('./service/games');

// eslint-disable-next-line jest/valid-describe-callback
describe('App', () =>
  it('Should display toolbar with header', () => {
    render(<App />);
    const toolBarHeader = screen.getByText('Planning Poker');
    expect(toolBarHeader).toBeInTheDocument();
  }));
