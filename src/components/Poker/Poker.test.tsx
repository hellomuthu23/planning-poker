import { render, screen } from '@testing-library/react';
import { onSnapshot as onSnapshotOriginal } from 'firebase/firestore';
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
// Mock Firestore onSnapshot to avoid validating real Query/DocRef types in tests
jest.mock('firebase/firestore', () => {
  const actual = jest.requireActual('firebase/firestore');
  return {
    ...actual,
    onSnapshot: jest.fn(),
  };
});

const onSnapshot = onSnapshotOriginal as unknown as jest.Mock;

describe('Poker component', () => {
  beforeEach(() => {
    // Ensure we return the correct param key expected by the component
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: 'zz' } as any);
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue(mockHistory as any);
    onSnapshot.mockReset();
  });
  it('should display game not found', async () => {
    // First onSnapshot call for game -> not found
    onSnapshot
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        cb({ exists: () => false });
        return jest.fn(); // unsubscribe
      })
      // Second onSnapshot call for players -> empty list
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        cb({ forEach: (_: any) => {} });
        return jest.fn();
      });

    // streamGame/streamPlayers can return any placeholder; they are only passed to onSnapshot
    jest.spyOn(gamesService, 'streamGame').mockReturnValue({} as any);
    jest.spyOn(gamesService, 'streamPlayers').mockReturnValue({} as any);
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
    // First call -> game snapshot
    onSnapshot
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        cb({ exists: () => true, data: () => mockGame });
        return jest.fn();
      })
      // Second call -> players snapshot
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        const snapshot = {
          forEach: (iterCb: (doc: any) => void) => {
            mockPlayers.forEach((p) => iterCb({ data: () => p }));
          },
        };
        cb(snapshot);
        return jest.fn();
      });

    jest.spyOn(gamesService, 'streamGame').mockReturnValue({} as any);
    jest.spyOn(gamesService, 'streamPlayers').mockReturnValue({} as any);

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

    // Mock snapshots
    onSnapshot
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        cb({ exists: () => true, data: () => mockGame });
        return jest.fn();
      })
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        const snapshot = {
          forEach: (iterCb: (doc: any) => void) => {
            mockPlayers.forEach((p) => iterCb({ data: () => p }));
          },
        };
        cb(snapshot);
        return jest.fn();
      });

    jest.spyOn(gamesService, 'streamGame').mockReturnValue({} as any);
    jest.spyOn(gamesService, 'streamPlayers').mockReturnValue({} as any);

    jest.spyOn(playersService, 'getCurrentPlayerId').mockReturnValue('xx');

    // Mock window.confirm
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    // Mock history.block
    let blockCallback: (location: any, action: string) => any;
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
