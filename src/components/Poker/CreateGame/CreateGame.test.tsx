import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CreateGame } from './CreateGame';
import * as gamesService from '../../../service/games';

jest.mock('../../../service/games');
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
describe('CreateGame component', () => {
  it('should display correct text fields', () => {
    render(<CreateGame />);

    expect(screen.getByPlaceholderText('Enter a session name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should display create button', () => {
    render(<CreateGame />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Create');
  });
  it('should be able to create new session', async () => {
    render(<CreateGame />);
    const sessionName = screen.getByPlaceholderText('Enter a session name');
    userEvent.type(sessionName, 'Marvels');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const createButton = screen.getByText('Create');
    userEvent.click(createButton);

    expect(gamesService.addNewGame).toHaveBeenCalled();

    expect(gamesService.addNewGame).toHaveBeenCalledWith(
      expect.objectContaining({ createdBy: 'SuperHeroRock', gameType: 'Fibonacci', name: 'AvengersMarvels' })
    );
  });
  it('should be able to create new session of TShirt Sizing', async () => {
    render(<CreateGame />);
    const sessionName = screen.getByPlaceholderText('Enter a session name');
    userEvent.type(sessionName, 'Marvels');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const tShirt = screen.getByText('T-Shirt', { exact: false });
    userEvent.click(tShirt);

    const createButton = screen.getByText('Create');
    userEvent.click(createButton);

    expect(gamesService.addNewGame).toHaveBeenCalled();

    expect(gamesService.addNewGame).toHaveBeenCalledWith(
      expect.objectContaining({ createdBy: 'SuperHeroRock', gameType: 'TShirt', name: 'AvengersMarvels' })
    );
  });
  it('should be able to create new session of Short Fibonacci Sizing', async () => {
    render(<CreateGame />);
    const sessionName = screen.getByPlaceholderText('Enter a session name');
    userEvent.type(sessionName, 'Marvels');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const gameType = screen.getByText('Short Fibonacci', { exact: false });
    userEvent.click(gameType);

    const createButton = screen.getByText('Create');
    userEvent.click(createButton);

    expect(gamesService.addNewGame).toHaveBeenCalled();

    expect(gamesService.addNewGame).toHaveBeenCalledWith(
      expect.objectContaining({ createdBy: 'SuperHeroRock', gameType: 'ShortFibonacci', name: 'AvengersMarvels' })
    );
  });
});
