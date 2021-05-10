import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import reactRouter from 'react-router';
import * as gamesService from '../../service/games';
import * as playersService from '../../service/players';
import { Game } from '../../types/game';
import { Player } from '../../types/player';
import { Status } from '../../types/status';
import { Poker } from './Poker';

jest.mock('../../service/players');
// jest.mock('../../service/games');
const mockHistoryPush = jest.fn();

describe('Poker component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ Id: 'zz' } as any);
  });
  it('should display game not found', async () => {
    jest.spyOn(gamesService, 'streamGame').mockImplementation(() => {
      return {
        onSnapshot: jest.fn((success) => success({ exists: false })),
      } as any;
    });
    jest.spyOn(gamesService, 'streamPlayers').mockImplementation(() => {
      return {
        onSnapshot: jest.fn(() => Promise.resolve(true)),
      } as any;
    });
    act(() => {
      render(<Poker />);
    });
    await waitFor(() => expect(screen.getByText('Game not found')).toBeInTheDocument());
  });
  it('should display game area when game is found', async () => {
    const mockGame: Game = { id: 'abc', name: 'avengers', createdBy: 'IronMan', gameStatus: Status.NotStarted } as Game;
    const mockPlayers: Player[] = [
      {
        id: 'xx',
        name: ' xyz',
        status: Status.NotStarted,
        value: 0,
      },
    ] as Player[];
    jest.spyOn(gamesService, 'streamGame').mockImplementation(() => {
      return {
        onSnapshot: jest.fn((success) => success({ exists: true, data: () => mockGame })),
      } as any;
    });
    jest.spyOn(gamesService, 'streamPlayers').mockImplementation(() => {
      return {
        onSnapshot: jest.fn((success) => success({ exists: true, forEach: () => mockPlayers })),
      } as any;
    });

    jest.spyOn(playersService, 'getCurrentPlayerId').mockReturnValue('322');
    act(() => {
      render(<Poker />);
    });

    await waitFor(() => screen.getByText(mockGame.name));

    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
    expect(screen.getByText(mockGame.gameStatus)).toBeInTheDocument();
  });
});
