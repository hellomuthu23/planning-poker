import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { onSnapshot as onSnapshotOriginal } from 'firebase/firestore';
import * as gamesService from '../../service/games';
import * as playersService from '../../service/players';
import { Game } from '../../types/game';
import { Player } from '../../types/player';
import { Status } from '../../types/status';
import { Poker } from './Poker';

const mockNavigate = vi.fn();

vi.mock('../../service/players');
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: () => ({ id: 'zz' }),
    useNavigate: () => mockNavigate,
  };
});

// Mock Firestore onSnapshot to avoid validating real Query/DocRef types in tests
vi.mock('firebase/firestore', async () => {
  const actual: any = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    onSnapshot: vi.fn(),
  };
});

const onSnapshot = onSnapshotOriginal as unknown as ReturnType<typeof vi.fn>;

describe('Poker component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    onSnapshot.mockReset();
  });
  it('should display game not found', async () => {
    // First onSnapshot call for game -> not found
    onSnapshot
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        cb({ exists: () => false });
        return vi.fn(); // unsubscribe
      })
      // Second onSnapshot call for players -> empty list
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        cb({ forEach: (_: any) => {} });
        return vi.fn();
      });

    // streamGame/streamPlayers can return any placeholder; they are only passed to onSnapshot
    vi.spyOn(gamesService, 'streamGame').mockReturnValue({} as any);
    vi.spyOn(gamesService, 'streamPlayers').mockReturnValue({} as any);
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
        return vi.fn();
      })
      // Second call -> players snapshot
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        const snapshot = {
          forEach: (iterCb: (doc: any) => void) => {
            mockPlayers.forEach((p) => iterCb({ data: () => p }));
          },
        };
        cb(snapshot);
        return vi.fn();
      });

    vi.spyOn(gamesService, 'streamGame').mockReturnValue({} as any);
    vi.spyOn(gamesService, 'streamPlayers').mockReturnValue({} as any);

    vi.spyOn(playersService, 'getCurrentPlayerId').mockReturnValue('xx');
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
        return vi.fn();
      })
      .mockImplementationOnce((ref: any, cb: (snap: any) => void) => {
        const snapshot = {
          forEach: (iterCb: (doc: any) => void) => {
            mockPlayers.forEach((p) => iterCb({ data: () => p }));
          },
        };
        cb(snapshot);
        return vi.fn();
      });

    vi.spyOn(gamesService, 'streamGame').mockReturnValue({} as any);
    vi.spyOn(gamesService, 'streamPlayers').mockReturnValue({} as any);

    vi.spyOn(playersService, 'getCurrentPlayerId').mockReturnValue('xx');

    render(<Poker />);

    await screen.findByText(mockGame.name);
  });
});
