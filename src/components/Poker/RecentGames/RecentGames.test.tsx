import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import reactRouter from 'react-router';
import * as playersService from '../../../service/players';
import { RecentGames } from './RecentGames';
import { PlayerGame } from '../../../types/player';

jest.mock('../../../service/players');
const mockHistoryPush = jest.fn();

describe('RecentGames component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
  });
  it('should display no recent session when no games found in user local storage', async () => {
    render(<RecentGames />);
    expect(screen.getByText('No recent sessions found')).toBeInTheDocument();
  });
  it('should display recent games when games found in local storage', async () => {
    const mockGames: PlayerGame[] = [
      { id: 'abv', name: 'avengers', createdById: 'IronMan', playerId: 'abv' },
      { id: 'xyz', name: 'endgame', createdById: 'SpiderMan', playerId: 'abc' },
    ];
    jest.spyOn(playersService, 'getPlayerRecentGames').mockResolvedValue(mockGames);

    render(<RecentGames />);

    await screen.findByText(mockGames[0].name);

    expect(screen.getByText(mockGames[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockGames[0].createdById)).toBeInTheDocument();
    expect(screen.getByText(mockGames[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockGames[1].createdById)).toBeInTheDocument();
  });

  it('should navigate to the game when clicking on game', async () => {
    const mockGames: PlayerGame[] = [
      { id: 'abc', name: 'avengers', createdById: 'IronMan', playerId: 'abc' },
      { id: 'xyz', name: 'endgame', createdById: 'SpiderMan', playerId: 'aaa' },
    ];
    jest.spyOn(playersService, 'getPlayerRecentGames').mockResolvedValue(mockGames);

    render(<RecentGames />);

    await screen.findByText(mockGames[0].name);
    userEvent.click(screen.getByText(mockGames[0].name));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/game/abc'));
  });
});
