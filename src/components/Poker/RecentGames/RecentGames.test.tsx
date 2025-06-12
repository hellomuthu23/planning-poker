import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import reactRouter from 'react-router';
import * as playersService from '../../../service/players';
import { PlayerGame } from '../../../types/player';
import { RecentGames } from './RecentGames';

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
      {
        id: 'abv',
        name: 'avengers',
        createdById: 'IronManId',
        createdBy: 'IronMan',
        playerId: 'abv',
      },
      {
        id: 'xyz',
        name: 'endgame',
        createdById: 'SpiderManId',
        createdBy: 'SpiderMan',
        playerId: 'abc',
      },
    ];
    jest.spyOn(playersService, 'getPlayerRecentGames').mockResolvedValue(mockGames);

    render(<RecentGames />);

    await screen.findByText(mockGames[0].name);

    expect(screen.getByText(mockGames[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockGames[0].createdBy)).toBeInTheDocument();
    expect(screen.getByText(mockGames[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockGames[1].createdBy)).toBeInTheDocument();
  });

  it('should navigate to the game when clicking on game', async () => {
    const mockGames: PlayerGame[] = [
      {
        id: 'abc',
        name: 'avengers',
        createdById: 'IronManId',
        createdBy: 'IronMan',
        playerId: 'abc',
      },
      {
        id: 'xyz',
        name: 'endgame',
        createdById: 'SpiderManId',
        createdBy: 'SpiderMan',
        playerId: 'aaa',
      },
    ];
    jest.spyOn(playersService, 'getPlayerRecentGames').mockResolvedValue(mockGames);

    render(<RecentGames />);

    await screen.findByText(mockGames[0].name);
    userEvent.click(screen.getByText(mockGames[0].name));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/game/abc'));
  });
});
