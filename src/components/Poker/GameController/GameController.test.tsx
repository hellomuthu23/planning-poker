import { render, screen } from '@testing-library/react';
import React from 'react';
import { Game, GameType } from '../../../types/game';
import { Status } from '../../../types/status';
import { GameController } from './GameController';
import * as gamesService from '../../../service/games';
import userEvent from '@testing-library/user-event';

jest.mock('../../../service/games');
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
document.execCommand = jest.fn();
describe('GameController component', () => {
  const mockGame: Game = {
    id: 'xyz',
    name: 'testGame',
    createdBy: 'someone',
    createdAt: new Date(),
    average: 0,
    createdById: 'abc',
    gameStatus: Status.InProgress,
  };
  const mockCurrentPlayerId = 'abc';

  it('should display game name', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);
    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
  });
  it('should display game status', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    expect(screen.queryByText(mockGame.gameStatus)).toBeInTheDocument();
  });
  it('should display game average value', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    expect(screen.queryByText(mockGame.average)).toBeInTheDocument();
  });
  it('should display game average for non TShirtGameType', () => {
    render(
      <GameController game={{ ...mockGame, gameType: GameType.ShortFibonacci }} currentPlayerId={mockCurrentPlayerId} />
    );

    expect(screen.queryByText('Average:')).toBeInTheDocument();
  });
  it('should not display game average for TShirt GameType', () => {
    render(<GameController game={{ ...mockGame, gameType: GameType.TShirt }} currentPlayerId={mockCurrentPlayerId} />);

    expect(screen.queryByText('Average:')).not.toBeInTheDocument();
  });
  it('should display exit option', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    expect(screen.queryByText('Exit')).toBeInTheDocument();
  });

  it('should display invite option', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    expect(screen.queryByText('Invite')).toBeInTheDocument();
  });

  it('should copy invite link to clipboard', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    userEvent.click(screen.getByTestId('invite-button'));
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should navigate to home page when exit button is clicked', () => {
    render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

    userEvent.click(screen.getByTestId('exit-button'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });

  describe('When Player is Moderator', () => {
    it('should display reveal option', () => {
      render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

      expect(screen.queryByText('Reveal')).toBeInTheDocument();
    });
    it('should display restart option', () => {
      render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);

      expect(screen.queryByText('Restart')).toBeInTheDocument();
    });
    it('should reveal cards when player click on Reveal button', () => {
      render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);
      userEvent.click(screen.getByTestId('reveal-button'));
      expect(gamesService.finishGame).toHaveBeenCalled();
    });
    it('should restart game when player click on Restart button', () => {
      render(<GameController game={mockGame} currentPlayerId={mockCurrentPlayerId} />);
      userEvent.click(screen.getByTestId('restart-button'));
      expect(gamesService.resetGame).toHaveBeenCalled();
    });
  });
});
