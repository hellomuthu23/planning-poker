import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import * as playersService from '../../../service/players';
import { RecentGames } from './RecentGames';
import { PlayerGame } from '../../../types/player';

const mockNavigate = vi.fn();
vi.mock('../../../service/players');
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('RecentGames component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should display no recent session when no games found in user local storage', async () => {
    render(<RecentGames />);
    expect(screen.getByText('No recent sessions found')).toBeInTheDocument();
  });
  it('should display recent games when games found in local storage', async () => {
    const mockGames: PlayerGame[] = [
      { id: 'abv', name: 'avengers', createdById: 'IronManId', createdBy: 'IronMan', playerId: 'abv' },
      { id: 'xyz', name: 'endgame', createdById: 'SpiderManId', createdBy: 'SpiderMan', playerId: 'abc' },
    ];
    vi.spyOn(playersService, 'getPlayerRecentGames').mockResolvedValue(mockGames);

    render(<RecentGames />);

    await screen.findByText(mockGames[0].name);

    expect(screen.getByText(mockGames[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockGames[0].createdBy)).toBeInTheDocument();
    expect(screen.getByText(mockGames[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockGames[1].createdBy)).toBeInTheDocument();
  });

  it('should navigate to the game when clicking on game', async () => {
    const mockGames: PlayerGame[] = [
      { id: 'abc', name: 'avengers', createdById: 'IronManId', createdBy: 'IronMan', playerId: 'abc' },
      { id: 'xyz', name: 'endgame', createdById: 'SpiderManId', createdBy: 'SpiderMan', playerId: 'aaa' },
    ];
    vi.spyOn(playersService, 'getPlayerRecentGames').mockResolvedValue(mockGames);

    render(<RecentGames />);

    await screen.findByText(mockGames[0].name);
    userEvent.click(screen.getByText(mockGames[0].name));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/game/abc'));
  });
});
