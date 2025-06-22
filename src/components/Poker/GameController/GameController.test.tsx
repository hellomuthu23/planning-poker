import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as gamesService from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { AutoReveal, GameController } from './GameController';

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

  it('should display game average value', () => {
    render(
      <GameController
        game={mockGame}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );

    expect(screen.getByText((mockGame.average || 0).toFixed(2))).toBeInTheDocument();
  });
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
  it('should not display game average for Custom GameType', () => {
    render(
      <GameController
        game={{ ...mockGame, gameType: GameType.Custom }}
        currentPlayerId={mockCurrentPlayerId}
        players={mockPlayers}
      />,
    );

    expect(screen.queryByText('Average:')).not.toBeInTheDocument();
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
