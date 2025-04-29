import { render, screen } from '@testing-library/react';
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
const mockUnblock = jest.fn();
const mockHistory = {
  push: mockHistoryPush,
  goBack: jest.fn(),
  block: () => mockUnblock,
};
describe('Poker component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ Id: 'zz' } as any);
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue(mockHistory as any);
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
    render(<Poker />);
    await screen.findByText('Game not found');
  });
  it('should display game area when game is found', async () => {
    const mockGame: Game = {
      id: 'abc',
      name: 'avengers',
      cards: [
        { value: 1, displayValue: '1', color: 'red' },
        { value: 2, displayValue: '2', color: 'blue' },
        { value: 3, displayValue: '3', color: 'green' },
      ],
      createdBy: 'IronMan',
      gameStatus: Status.NotStarted,
    } as Game;
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

    jest.spyOn(playersService, 'getCurrentPlayerId').mockReturnValue('xx');
    render(<Poker />);

    await screen.findByText(mockGame.name);

    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockGame.gameStatus} 🚀`)).toBeInTheDocument();
  });
  it('should display confirmation dialog when user clicks the back button', async () => {
    const mockGame: Game = {
      id: 'abc',
      name: 'avengers',
      cards: [
        { value: 1, displayValue: '1', color: 'red' },
        { value: 2, displayValue: '2', color: 'blue' },
        { value: 3, displayValue: '3', color: 'green' },
      ],
      createdBy: 'IronMan',
      gameStatus: Status.NotStarted,
    } as Game;

    const mockPlayers: Player[] = [
      {
        id: 'xx',
        name: 'xyz',
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

    jest.spyOn(playersService, 'getCurrentPlayerId').mockReturnValue('xx');

    // Mock window.confirm
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    // Mock history.block
    let blockCallback: (location: any, action: string) => void;
    const unblockMock = jest.fn();
    const mockHistory = {
      push: jest.fn(),
      goBack: jest.fn(),
      block: jest.fn((callback) => {
        blockCallback = callback; // Capture the callback
        return unblockMock;
      }),
    };
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue(mockHistory as any);

    render(<Poker />);

    await screen.findByText(mockGame.name);

    // Simulate back navigation by invoking the block callback
    blockCallback!({}, 'POP'); // Simulate the 'POP' action (back navigation)

    // Assert that the confirmation dialog was shown
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to go back?');

    // Cleanup the mock
    confirmSpy.mockRestore();
  });
});
