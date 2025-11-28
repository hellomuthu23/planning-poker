import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import * as gamesService from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import { Status } from '../../../types/status';
import { GameController } from './GameController';

const mockNavigate = vi.fn();
vi.mock('../../../service/games');
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
document.execCommand = vi.fn();
describe('GameController component', () => {
  const mockGame: Game = {
    id: 'xyz',
    name: 'testGame',
    cards: [
      { value: 1, displayValue: '1', color: 'red' },
      { value: 2, displayValue: '2', color: 'blue' },
      { value: 3, displayValue: '3', color: 'green' },
    ],
    createdBy: 'someone',
    createdAt: new Date(),
    average: 0,
    createdById: 'abc',
    gameStatus: Status.InProgress,
  };
  const mockCurrentPlayerId = 'abc';

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      writable: true,
    });
  });

  it('should display game name', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);
    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
  });
  it('should display game status', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    expect(screen.getByText(`${mockGame.gameStatus} ⏱️`)).toBeInTheDocument();
  });
  it('should display game average value', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    expect(screen.getByText(mockGame.average)).toBeInTheDocument();
  });
  it('should display game average for non TShirtGameType', () => {
    render(
      <GameController
        game={{ ...mockGame, gameType: GameType.ShortFibonacci }}
        currentPlayerId={mockCurrentPlayerId}
      />,
    );

    expect(screen.getByText('Average:')).toBeInTheDocument();
  });
  it('should not display game average for TShirt GameType', () => {
    render(
      <GameController
        game={{ ...mockGame, gameType: GameType.TShirt }}
        currentPlayerId={mockCurrentPlayerId}
      />,
    );

    expect(screen.queryByText('Average:')).not.toBeInTheDocument();
  });
  it('should not display game average for TShirt & Numbers GameType', () => {
    render(
      <GameController
        game={{ ...mockGame, gameType: GameType.TShirtAndNumber }}
        currentPlayerId={mockCurrentPlayerId}
      />,
    );

    expect(screen.queryByText('Average:')).not.toBeInTheDocument();
  });
  it('should not display game average for Custom GameType', () => {
    render(
      <GameController
        game={{ ...mockGame, gameType: GameType.Custom }}
        currentPlayerId={mockCurrentPlayerId}
      />,
    );

    expect(screen.queryByText('Average:')).not.toBeInTheDocument();
  });
  it('should display exit option', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should display invite option', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    expect(screen.getByText('Invite')).toBeInTheDocument();
  });

  it('should copy invite link to clipboard', async () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    await userEvent.click(screen.getByTestId('invite-button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('/join/'));
  });

  it('should navigate to home page when exit button is clicked', async () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    await userEvent.click(screen.getByTestId('exit-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  describe('When Player is Moderator', () => {
    it('should display reveal option', () => {
      render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

      expect(screen.getByText('Reveal')).toBeInTheDocument();
    });
    it('should display restart option', () => {
      render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

      expect(screen.getByText('Restart')).toBeInTheDocument();
    });
    it('should reveal cards when player click on Reveal button', async () => {
      render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);
      await userEvent.click(screen.getByTestId('reveal-button'));
      expect(gamesService.finishGame).toHaveBeenCalled();
    });
    it('should restart game when player click on Restart button', async () => {
      render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);
      await userEvent.click(screen.getByTestId('restart-button'));
      expect(gamesService.resetGame).toHaveBeenCalled();
    });
  });
});
