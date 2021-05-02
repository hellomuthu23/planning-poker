import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import reactRouter from 'react-router';
import * as playersService from '../../../service/players';
import { Game } from '../../../types/game';
import { RecentGames } from './RecentGames';

jest.mock('../../../service/players');
const mockHistoryPush = jest.fn();

describe('RecentGames component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
  });
  it('should display no recent session when no games found in user local storage', async () => {
    act(() => {
      render(<RecentGames />);
    });
    expect(screen.getByText('No recent sessions found')).toBeInTheDocument();
  });
  it('should display recent games when games found in local storage', async () => {
    const mockGames: Game[] = [
      { id: 'abv', name: 'avengers', createdBy: 'IronMan' },
      { id: 'xyz', name: 'endgame', createdBy: 'SpiderMan' },
    ] as Game[];
    jest.spyOn(playersService, 'getPlayerRecentGames').mockResolvedValue(mockGames);

    act(() => {
      render(<RecentGames />);
    });

    await waitFor(() => screen.getByText(mockGames[0].name));

    expect(screen.getByText(mockGames[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockGames[0].createdBy)).toBeInTheDocument();
    expect(screen.getByText(mockGames[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockGames[1].createdBy)).toBeInTheDocument();
  });

  it('should navigate to the game when clicking on game', async () => {
    const mockGames: Game[] = [
      { id: 'abc', name: 'avengers', createdBy: 'IronMan' },
      { id: 'xyz', name: 'endgame', createdBy: 'SpiderMan' },
    ] as Game[];
    jest.spyOn(playersService, 'getPlayerRecentGames').mockResolvedValue(mockGames);

    act(() => {
      render(<RecentGames />);
    });

    await waitFor(() => screen.getByText(mockGames[0].name));
    userEvent.click(screen.getByText(mockGames[0].name));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/game/abc'));
  });
});
