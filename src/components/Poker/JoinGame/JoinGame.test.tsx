import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import * as playersService from '../../../service/players';
import { JoinGame } from './JoinGame';

const mockHistoryPush = vi.fn();
vi.mock('../../../service/players');
vi.mock('../../../service/games');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useHistory: () => ({ push: mockHistoryPush }),
    useParams: () => ({ id: '' }),
  };
});

describe('JoinGame component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should display correct text fields', () => {
    vi.spyOn(playersService, 'isCurrentPlayerInGame').mockResolvedValue(false);

    render(<JoinGame />);

    expect(screen.getByPlaceholderText('xyz...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should display join button', () => {
    vi.spyOn(playersService, 'isCurrentPlayerInGame').mockResolvedValue(false);
    render(<JoinGame />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Join');
  });
  it('should be able to join a session', async () => {
    vi.spyOn(playersService, 'addPlayerToGame').mockResolvedValue(true);
    vi.spyOn(playersService, 'isCurrentPlayerInGame').mockResolvedValue(false);
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
  });
});
