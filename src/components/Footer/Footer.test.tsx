import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Footer } from './Footer';

const mockHistoryPush = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  };
});

describe('Footer component', () => {
  const { location } = window;
  beforeAll(() => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { href: '' };
  });

  afterAll((): void => {
    // @ts-ignore
    window.location = location;
  });
  it('should render copyright', () => {
    render(<Footer />);
    const element = screen.getByText('hellomuthu23');
    expect(element).toBeInTheDocument();
  });
});
