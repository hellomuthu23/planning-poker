import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Toolbar } from './Toolbar';

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
    const newSession = screen.getByText('New Session');
    expect(newSession).toBeInTheDocument();
  });
  it('should render Join session button', () => {
    render(<Toolbar />);
    const newSession = screen.getByText('Join Session');
    expect(newSession).toBeInTheDocument();
  });
  it('should navigate to Home page when New Session button is clicked', () => {
    render(<Toolbar />);
    const newSession = screen.getByText('New Session');
    act(() => {
      userEvent.click(newSession);
    });
    expect(mockHistoryPush).toBeCalledWith('/');
  });
  it('should navigate to Join session page when Join Session button is clicked', () => {
    render(<Toolbar />);
    const newSession = screen.getByText('Join Session');
    act(() => {
      userEvent.click(newSession);
    });
    expect(mockHistoryPush).toBeCalledWith('/join');
  });
  it('should navigate to home page when Title is clicked clicked', () => {
    render(<Toolbar />);
    const title = screen.getByText('Planning Poker');
    act(() => {
      userEvent.click(title);
    });
    expect(mockHistoryPush).toBeCalledWith('/');
  });
  it('should navigate to github page when Github icon is clicked clicked', () => {
    const toolbar = render(<Toolbar />);
    const title = toolbar.container.querySelector('#github-button') as HTMLElement;
    act(() => {
      userEvent.click(title);
    });
    expect(window.location.href).toEqual('https://github.com/hellomuthu23/planning-poker');
  });
});
