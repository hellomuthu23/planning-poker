import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { JoinGame } from './JoinGame';
import * as playersService from '../../../service/players';

jest.mock('../../../service/players');
jest.mock('../../../service/games');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: () => {
    return {
      id: 'abc'
    }
  }
}));
describe('JoinGame component', () => {
  it('should display correct text fields', () => {

    render(<JoinGame />);

    expect(screen.getByPlaceholderText('xyz...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should display join button', () => {

    render(<JoinGame />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Join');
  });
  it.only('should be able to join a session', async () => {

    jest.spyOn(playersService, 'addPlayerToGame').mockResolvedValue(true);
    render(
      <JoinGame />
    );
    const sessionID = screen.getByPlaceholderText('xyz...');
    userEvent.clear(sessionID);
    userEvent.type(sessionID, 'gameID');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const joinButton = screen.getByText('Join');

    act(() => {
      userEvent.click(joinButton);
    });


    expect(playersService.addPlayerToGame).toHaveBeenCalled();

    expect(playersService.addPlayerToGame).toHaveBeenCalledWith('gameID', 'Rock');
  });

  // it('should automatically join the game when player has already joined', () => {
  //   const gameId = 'abc'
  //   mockUseParams.mockReturnValue(() => { return { id: gameId } });
  //   jest.spyOn(gameService, 'getGame').mockResolvedValue({ id: gameId } as Game);
  //   jest.spyOn(playersService, 'addPlayerToGame').mockResolvedValue(true);
  //   jest.spyOn(playersService, 'isCurrentPlayerInGame').mockReturnValue(true);

  //   render(
  //     <JoinGame
  //     />
  //   );

  //   expect(mockHistoryPush).toHaveBeenCalled();
  // });
});
