/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Mock router BEFORE importing the component so hooks are intercepted
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

import { Toolbar } from './Toolbar';

const theme = createMuiTheme();
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Toolbar component', () => {
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
  it('should render correct title', () => {
    renderWithTheme(<Toolbar />);
    const title = screen.getByText('Planning Poker');
    expect(title).toBeInTheDocument();
  });
  it('should render Create new session button', () => {
    renderWithTheme(<Toolbar />);
    const newSession = screen.getByTestId('toolbar.menu.newSession');
    expect(newSession).toBeInTheDocument();
  });
  it('should render Join session button', () => {
    renderWithTheme(<Toolbar />);
    const newSession = screen.getByTestId('toolbar.menu.joinSession');
    expect(newSession).toBeInTheDocument();
  });
  it('should navigate to Home page when New Session button is clicked', () => {
    renderWithTheme(<Toolbar />);
    const newSession = screen.getByTestId('toolbar.menu.newSession');
    userEvent.click(newSession);
    expect(mockHistoryPush).toBeCalledWith('/');
  });
  it('should navigate to Join session page when Join Session button is clicked', () => {
    renderWithTheme(<Toolbar />);
    const newSession = screen.getByTestId('toolbar.menu.joinSession');
    userEvent.click(newSession);
    expect(mockHistoryPush).toBeCalledWith('/join');
  });
  it('should navigate to home page when Title is clicked clicked', () => {
    renderWithTheme(<Toolbar />);
    const title = screen.getByText('Planning Poker');
    userEvent.click(title);
    expect(mockHistoryPush).toBeCalledWith('/');
  });
  it('should navigate to github page when Github icon is clicked clicked', () => {
    const view = renderWithTheme(<Toolbar />);
    const title = view.container.querySelector('#github-button') as HTMLElement;
    userEvent.click(title);
    expect(window.location.href).toEqual('https://github.com/rfoerthe/planning-poker');
  });
});
