import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import App from './App';

vi.mock('./service/players');
vi.mock('./service/games');

// eslint-disable-next-line jest/valid-describe-callback
describe('App', () =>
  it('Should display toolbar with header', () => {
    render(<App />);
    const toolBarHeader = screen.getByText('Planning Poker');
    expect(toolBarHeader).toBeInTheDocument();
  }));
