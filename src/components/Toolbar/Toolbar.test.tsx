/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Toolbar } from './Toolbar';
import { useTranslation } from 'react-i18next';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  useMediaQuery: () => false,
}));

describe('Toolbar component', () => {
  const { location } = window;
  beforeAll(() => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { href: '' };
  });

  afterAll((): void => {
    window.location = location;
  });
  it('should render correct title', () => {
    render(<Toolbar />);
    const title = screen.getByText('Planning Poker');
    expect(title).toBeInTheDocument();
  });
  it('should render Create new session button', () => {
    render(<Toolbar />);
    const newSession = screen.getByTestId('toolbar.menu.newSession');
    expect(newSession).toBeInTheDocument();
  });
  it('should render Join session button', () => {
    render(<Toolbar />);
    const newSession = screen.getByTestId('toolbar.menu.joinSession');
    expect(newSession).toBeInTheDocument();
  });
  it('should navigate to Home page when New Session button is clicked', () => {
    render(<Toolbar />);
    const newSession = screen.getByTestId('toolbar.menu.newSession');
    userEvent.click(newSession);
    expect(mockHistoryPush).toBeCalledWith('/');
  });
  it('should navigate to Join session page when Join Session button is clicked', () => {
    render(<Toolbar />);
    const newSession = screen.getByTestId('toolbar.menu.joinSession');
    userEvent.click(newSession);
    expect(mockHistoryPush).toBeCalledWith('/join');
  });
  it('should navigate to home page when Title is clicked clicked', () => {
    render(<Toolbar />);
    const title = screen.getByText('Planning Poker');
    userEvent.click(title);
    expect(mockHistoryPush).toBeCalledWith('/');
  });
  it('should navigate to github page when Github icon is clicked clicked', () => {
    const view = render(<Toolbar />);
    const title = view.container.querySelector('#github-button') as HTMLElement;
    userEvent.click(title);
    expect(window.location.href).toEqual('https://github.com/hellomuthu23/planning-poker');
  });
});
