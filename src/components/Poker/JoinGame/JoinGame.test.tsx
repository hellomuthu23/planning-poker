import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import reactRouter from 'react-router';
import * as gameService from '../../../service/games';
import * as playersService from '../../../service/players';
import { Game } from '../../../types/game';
import { JoinGame } from './JoinGame';

jest.mock('../../../service/players');
jest.mock('../../../service/games');

const mockHistoryPush = jest.fn();
describe('JoinGame component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '' });
    localStorage.clear();
  });

  it('should display correct text fields', () => {
    jest.spyOn(playersService, 'isCurrentPlayerInGame').mockResolvedValue(false);

    render(<JoinGame />);

    expect(screen.getByPlaceholderText('xyz...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should pre-fill the name field from localStorage', () => {
    localStorage.setItem('recentPlayerName', 'Alice');
    jest.spyOn(playersService, 'isCurrentPlayerInGame').mockResolvedValue(false);

    render(<JoinGame />);
    expect(screen.getByPlaceholderText('Enter your name')).toHaveValue('Alice');
  });

  it('should display join button', () => {
    jest.spyOn(playersService, 'isCurrentPlayerInGame').mockResolvedValue(false);
    render(<JoinGame />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Join');
  });

  it('should be able to join a session', async () => {
    jest.spyOn(playersService, 'addPlayerToGame').mockResolvedValue(true);
    jest.spyOn(playersService, 'isCurrentPlayerInGame').mockResolvedValue(false);
    render(<JoinGame />);
    const sessionID = screen.getByPlaceholderText('xyz...');
    userEvent.clear(sessionID);
    userEvent.type(sessionID, 'gameId');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const joinButton = screen.getByText('Join');

    userEvent.click(joinButton);

    expect(playersService.addPlayerToGame).toHaveBeenCalled();

    expect(playersService.addPlayerToGame).toHaveBeenCalledWith('gameId', 'Rock');
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/game/gameId'));
    // Check that the name is saved to localStorage
    expect(localStorage.getItem('recentPlayerName')).toBe('Rock');
  });

  it('should automatically join the game when player has already joined', async () => {
    const gameId = 'abc';
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: gameId });
    jest.spyOn(gameService, 'getGame').mockResolvedValue({ id: gameId } as Game);
    jest.spyOn(playersService, 'addPlayerToGame').mockResolvedValue(true);
    jest.spyOn(playersService, 'isCurrentPlayerInGame').mockResolvedValue(true);

    render(<JoinGame />);

    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/game/abc'));
  });

  it('should not automatically join the game when player it not in the game', async () => {
    const gameId = 'abc';
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: gameId });
    jest.spyOn(gameService, 'getGame').mockResolvedValue({ id: gameId } as Game);
    jest.spyOn(playersService, 'addPlayerToGame').mockResolvedValue(true);
    jest.spyOn(playersService, 'isCurrentPlayerInGame').mockResolvedValue(false);

    render(<JoinGame />);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });
});
