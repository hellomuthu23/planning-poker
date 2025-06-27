import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeControl } from './ThemeControl';

describe('ThemeControl', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders with light theme by default', () => {
    render(<ThemeControl />);
    expect(screen.getByTestId('toolbar.menu.theme')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('renders with dark theme if set in localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeControl />);
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles theme on click', () => {
    render(<ThemeControl />);
    const button = screen.getByTestId('toolbar.menu.theme');
    // Initially light
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click to switch to dark
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(screen.getByText('Light')).toBeInTheDocument();

    // Click to switch back to light
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });
});
