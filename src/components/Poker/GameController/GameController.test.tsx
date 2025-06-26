import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as gamesService from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { CardConfig } from '../../Players/CardPicker/CardConfigs';
import {
  areAllFinishedPlayersDisplayValuesNumeric,
  AutoReveal,
  GameController,
  getAverage,
} from './GameController';

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
    storyName: 'testStory',
  };
  const mockCurrentPlayerId = 'abc';
  const mockPlayers: Player[] = [
    { id: 'abc', name: 'Player1', value: 2, emoji: '😀', status: Status.InProgress },
  ];

  it('should display game name', () => {
    render(
      <GameController
        game={mockGame}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );
    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
  });
  it('should display game status', () => {
    render(
      <GameController
        game={mockGame}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );

    expect(screen.getByText(`${mockGame.gameStatus} ⏱️`)).toBeInTheDocument();
  });

  it('should display exit option', () => {
    render(
      <GameController
        game={mockGame}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );

    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should display invite option', () => {
    render(
      <GameController
        game={mockGame}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );

    expect(screen.getByText('Invite')).toBeInTheDocument();
  });

  it('should copy invite link to clipboard', () => {
    render(
      <GameController
        game={mockGame}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );

    userEvent.click(screen.getByTestId('invite-button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/join/xyz');
  });

  it('should navigate to home page when exit button is clicked', () => {
    render(
      <GameController
        game={mockGame}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );

    userEvent.click(screen.getByTestId('exit-button'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
  it('should display story name', () => {
    render(
      <GameController
        game={mockGame}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );
    expect(screen.getByDisplayValue('testStory')).toBeInTheDocument();
  });

  it('can enter new story name', () => {
    render(
      <GameController
        game={mockGame}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );
    const input = screen.getByPlaceholderText('Enter story name or number') as HTMLInputElement;
    userEvent.type(input, 'n');
    expect(gamesService.updateStoryName).toHaveBeenCalledWith(mockGame.id, 'testStoryn');
  });

  describe('When Player is Moderator', () => {
    it('should display reveal option', () => {
      render(
        <GameController
          game={mockGame}
          currentPlayerId={mockCurrentPlayerId}
          players={mockPlayers}
        />,
      );

      expect(screen.getByText('Reveal')).toBeInTheDocument();
    });
    it('should display restart option', () => {
      render(
        <GameController
          game={mockGame}
          currentPlayerId={mockCurrentPlayerId}
          players={mockPlayers}
        />,
      );

      expect(screen.getByText('Restart')).toBeInTheDocument();
    });
    it('should reveal cards when player click on Reveal button', () => {
      render(
        <GameController
          game={mockGame}
          currentPlayerId={mockCurrentPlayerId}
          players={mockPlayers}
        />,
      );
      userEvent.click(screen.getByTestId('reveal-button'));
      expect(gamesService.finishGame).toHaveBeenCalled();
    });
    it('should restart game when player click on Restart button', () => {
      render(
        <GameController
          game={mockGame}
          currentPlayerId={mockCurrentPlayerId}
          players={mockPlayers}
        />,
      );
      userEvent.click(screen.getByTestId('restart-button'));
      expect(gamesService.resetGame).toHaveBeenCalled();
    });
    it('should call finish game when auto reveal is true and all players has voted', () => {
      const mockPlayersWithVotes: Player[] = [
        { id: 'abc', name: 'Player1', value: 2, emoji: '😀', status: Status.Finished },
        { id: 'def', name: 'Player2', value: 3, emoji: '😃', status: Status.Finished },
      ];
      const mockGameWihAutoReveal: Game = {
        ...mockGame,
        autoReveal: true,
      };
      render(
        <GameController
          game={mockGameWihAutoReveal}
          currentPlayerId={mockCurrentPlayerId}
          players={mockPlayersWithVotes}
        />,
      );
      expect(gamesService.finishGame).toHaveBeenCalled();
    });
  });

  describe('Average value', () => {
    it('should display game average for non TShirtGameType', () => {
      render(
        <GameController
          game={{ ...mockGame, gameType: GameType.ShortFibonacci }}
          currentPlayerId={mockCurrentPlayerId}
          players={mockPlayers}
        />,
      );

      expect(screen.getByText('Average:')).toBeInTheDocument();
    });
    it('should not display game average for TShirt GameType', () => {
      render(
        <GameController
          game={{ ...mockGame, gameType: GameType.TShirt }}
          currentPlayerId={mockCurrentPlayerId}
          players={mockPlayers}
        />,
      );

      expect(screen.queryByText('Average:')).not.toBeInTheDocument();
    });
    it('should not display game average for TShirt & Numbers GameType', () => {
      render(
        <GameController
          game={{ ...mockGame, gameType: GameType.TShirtAndNumber }}
          currentPlayerId={mockCurrentPlayerId}
          players={mockPlayers}
        />,
      );

      expect(screen.queryByText('Average:')).not.toBeInTheDocument();
    });

    it('shows EMPTY as average when game is not finished', () => {
      render(
        <GameController
          game={{ ...mockGame, gameType: GameType.ShortFibonacci, gameStatus: Status.InProgress }}
          currentPlayerId={mockCurrentPlayerId}
          players={mockPlayers}
        />,
      );
      expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('shows N/A as average if not all finished players have numeric values', () => {
      const playersWithNonNumeric: Player[] = [
        { id: 'abc', name: 'Player1', value: 1, emoji: '☕', status: Status.Finished },
        { id: 'def', name: 'Player2', value: 2, emoji: '😀', status: Status.Finished },
      ];
      const customCards: CardConfig[] = [
        { value: 1, displayValue: '1', color: 'red' },
        { value: 2, displayValue: 'X', color: 'blue' },
      ];
      const mockGameWithCustomCards: Game = { ...mockGame, cards: customCards };
      render(
        <GameController
          game={{
            ...mockGameWithCustomCards,
            gameType: GameType.Custom,
            gameStatus: Status.Finished,
          }}
          currentPlayerId={mockCurrentPlayerId}
          players={playersWithNonNumeric}
        />,
      );
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('shows average value and info icon when all finished players have numeric values and game is finished', () => {
      const finishedPlayers: Player[] = [
        { id: 'abc', name: 'Player1', value: 1, emoji: '😀', status: Status.Finished },
        { id: 'def', name: 'Player2', value: 2, emoji: '😃', status: Status.Finished },
      ];
      const customCards: CardConfig[] = [
        { value: 1, displayValue: '2', color: 'red' },
        { value: 2, displayValue: '4', color: 'blue' },
      ];
      const mockGameWithCustomCards: Game = { ...mockGame, cards: customCards };

      render(
        <GameController
          game={{
            ...mockGameWithCustomCards,
            gameType: GameType.Custom,
            gameStatus: Status.Finished,
          }}
          currentPlayerId={mockCurrentPlayerId}
          players={finishedPlayers}
        />,
      );
      // Average is (2+4)/2 = 3.00
      expect(screen.getByText('3.00')).toBeInTheDocument();
      // Tooltip text should be present in the DOM (even if hidden)
      expect(screen.getByText(/Rounded Average/i)).toBeInTheDocument();
    });

    it('areAllFinishedPlayersDisplayValuesNumeric returns true for all numeric values', () => {
      const cards = [
        { value: 1, displayValue: '1', color: 'red' },
        { value: 2, displayValue: '2', color: 'blue' },
      ];
      const players: Player[] = [
        { id: '1', name: 'A', value: 1, emoji: '', status: Status.Finished },
        { id: '2', name: 'B', value: 2, emoji: '', status: Status.Finished },
      ];
      expect(
        areAllFinishedPlayersDisplayValuesNumeric(
          { ...mockGame, gameType: GameType.Custom, cards: cards },
          players,
        ),
      ).toBe(true);
    });

    it('areAllFinishedPlayersDisplayValuesNumeric returns false if any finished player has non-numeric value', () => {
      const cards = [
        { value: 1, displayValue: '1', color: 'red' },
        { value: 2, displayValue: 'coffee', color: 'brown' },
      ];
      const players: Player[] = [
        { id: '1', name: 'A', value: 1, emoji: '', status: Status.Finished },
        { id: '2', name: 'B', value: 2, emoji: '', status: Status.Finished },
      ];
      expect(
        areAllFinishedPlayersDisplayValuesNumeric(
          { ...mockGame, gameType: GameType.Custom, cards: cards },
          players,
        ),
      ).toBe(false);
    });

    it('areAllFinishedPlayersDisplayValuesNumeric returns true for Custom gameType with numeric displayValues', () => {
      const cards = [
        { value: 1, displayValue: '1', color: 'red' },
        { value: 2, displayValue: '2', color: 'blue' },
      ];
      const players: Player[] = [
        { id: '1', name: 'A', value: 1, emoji: '', status: Status.Finished },
        { id: '2', name: 'B', value: 2, emoji: '', status: Status.Finished },
      ];
      expect(
        areAllFinishedPlayersDisplayValuesNumeric(
          { ...mockGame, gameType: GameType.Custom, cards: cards },
          players,
        ),
      ).toBe(true);
    });

    it('areAllFinishedPlayersDisplayValuesNumeric returns false for Custom gameType with non-numeric displayValues', () => {
      const cards = [
        { value: 1, displayValue: 'coffee', color: 'brown' },
        { value: 2, displayValue: '2', color: 'blue' },
      ];
      const players: Player[] = [
        { id: '1', name: 'A', value: 1, emoji: '', status: Status.Finished },
        { id: '2', name: 'B', value: 2, emoji: '', status: Status.Finished },
      ];
      expect(
        areAllFinishedPlayersDisplayValuesNumeric(
          { ...mockGame, gameType: GameType.Custom, cards: cards },
          players,
        ),
      ).toBe(false);
    });
    it('should provide the average of players votes', () => {
      const players: Player[] = [
        { id: '1', name: 'A', value: 4, emoji: '', status: Status.Finished },
        { id: '2', name: 'B', value: 1, emoji: '', status: Status.Finished },
        { id: 'dumpty', name: 'Humpty', value: 2, emoji: 'egg', status: Status.Finished },
      ];
      const expected = (4 + 1 + 2) / 3;

      const res = getAverage(mockGame, players);

      expect(res).toEqual(Number(expected.toFixed(2)));
    });

    it('should not calculate players who have not finished', () => {
      const players: Player[] = [
        { id: '1', name: 'A', value: 4, emoji: '', status: Status.Finished },
        { id: '2', name: 'B', value: 1, emoji: '', status: Status.Finished },
        { id: 'dumpty', name: 'Humpty', value: 2, emoji: 'egg', status: Status.InProgress },
      ];
      const expected = (4 + 1) / 2;
      const res = getAverage(mockGame, players);

      expect(res).toEqual(Number(expected.toFixed(2)));
    });
  });
  describe('AutoReveal', () => {
    it('renders the auto reveal switch', () => {
      const { getByRole, getByText } = render(
        <AutoReveal autoReveal={true} onAutoReveal={() => {}} />,
      );
      expect(getByText(/auto reveal/i)).toBeInTheDocument();
      expect(getByRole('switch')).toBeInTheDocument();
    });

    it('shows OFF when switch is off and ON when switch is on', () => {
      const { getByRole } = render(<AutoReveal autoReveal={false} onAutoReveal={() => {}} />);
      const switchBtn = getByRole('switch');
      // Initially OFF
      expect(switchBtn).toHaveAttribute('aria-checked', 'false');
    });

    it('shows ON when switch is on', () => {
      const { getByRole } = render(<AutoReveal autoReveal={true} onAutoReveal={() => {}} />);
      const switchBtn = getByRole('switch');
      expect(switchBtn).toHaveAttribute('aria-checked', 'true');
    });

    it('calls onAutoReveal with correct value when toggled', () => {
      const onAutoReveal = jest.fn();
      const { getByRole } = render(<AutoReveal autoReveal={false} onAutoReveal={onAutoReveal} />);
      const switchBtn = getByRole('switch');
      // Toggle ON
      fireEvent.click(switchBtn);
      expect(onAutoReveal).toHaveBeenCalledWith(true);
    });
  });
});
