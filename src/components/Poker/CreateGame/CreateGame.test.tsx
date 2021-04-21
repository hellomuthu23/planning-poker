import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CreateGame } from './CreateGame';
import * as gamesService from '../../../service/games';
import { act } from 'react-dom/test-utils';

jest.mock('../../../service/games');
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
describe('CreateGame component', () => {

  it('should display correct text fields', () => {

    render(
      <CreateGame
      />
    );

    expect(screen.getByPlaceholderText('Enter a session name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should display create button', () => {

    render(
      <CreateGame
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Create');
  });
  it('should be able to create new session', () => {
    render(
      <CreateGame
      />
    );
    const sessionName = screen.getByPlaceholderText('Enter a session name');
    act(() => {
      userEvent.type(sessionName, 'Marvels');
    });

    const userName = screen.getByPlaceholderText('Enter your name');

    act(() => {
      userEvent.type(userName, 'Rock');
    });

    const createButton = screen.getByText('Create');

    act(() => {
      userEvent.click(createButton);
    });

    expect(gamesService.addNewGame).toHaveBeenCalled();

    expect(gamesService.addNewGame).toHaveBeenCalledWith(expect.objectContaining({ "createdBy": "SuperHeroRock", "name": "AvengersMarvels" }));

  })
});
