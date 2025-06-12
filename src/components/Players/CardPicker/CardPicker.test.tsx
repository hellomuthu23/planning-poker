/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as playersService from '../../../service/players';
import { Game, GameType } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import * as cardConfigs from './CardConfigs';
import { getCards } from './CardConfigs';
import { CardPicker } from './CardPicker';

jest.mock('../../../service/players');
describe('CardPicker component', () => {
  const mockGame: Game = {
    id: 'xyz',
    name: 'testGame',
    createdBy: 'someone',
    createdAt: new Date(),
    cards: [
      { value: 1, displayValue: '1', color: 'red' },
      { value: 2, displayValue: '2', color: 'blue' },
      { value: 3, displayValue: 'xl', color: 'green' },
    ],
    gameType: GameType.Fibonacci,
    average: 0,
    createdById: 'abc',
    gameStatus: Status.InProgress,
  };
  const mockPlayers: Player[] = [
    { id: 'a1', name: 'SpiderMan', status: Status.InProgress, value: 0 },
    { id: 'a2', name: 'IronMan', status: Status.Finished, value: 3 },
  ];
  const currentPlayerId = mockPlayers[0].id;
  it('should display correct card values', () => {
    const view = render(
      <CardPicker
        game={{ ...mockGame, cards: getCards(GameType.Fibonacci) }}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />,
    );

    getCards(GameType.Fibonacci)
      .filter((a) => a.value >= 0)
      .forEach((card) => {
        const cardElement = view.container.querySelector(`#card-${card.displayValue}`);
        expect(cardElement).toBeInTheDocument();
        const cardValueElement = screen.queryAllByText(card.value);
        expect(cardValueElement.length).toBeGreaterThan(0);
      });
  });
  it('should display correct card values for ShortFibonacci game type', () => {
    const view = render(
      <CardPicker
        game={{
          ...mockGame,
          cards: getCards(GameType.ShortFibonacci),
          gameType: GameType.ShortFibonacci,
        }}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />,
    );

    getCards(GameType.ShortFibonacci)
      .filter((a) => a.value >= 0)
      .forEach((card) => {
        const cardElement = view.container.querySelector(`#card-${card.displayValue}`);
        expect(cardElement).toBeInTheDocument();
        const cardValueElement = screen.queryAllByText(card.displayValue);
        expect(cardValueElement.length).toBeGreaterThan(0);
      });
  });
  it('should display correct card values TShirt game type', () => {
    const view = render(
      <CardPicker
        game={{ ...mockGame, cards: getCards(GameType.TShirt), gameType: GameType.TShirt }}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />,
    );

    getCards(GameType.TShirt)
      .filter((a) => a.value >= 0)
      .forEach((card) => {
        const cardElement = view.container.querySelector(`#card-${card.displayValue}`);
        expect(cardElement).toBeInTheDocument();
        const cardValueElement = screen.queryAllByText(card.displayValue);
        expect(cardValueElement.length).toBeGreaterThan(0);
      });
  });
  it('should display correct card values TShirt & Numbers game type', () => {
    const view = render(
      <CardPicker
        game={{
          ...mockGame,
          cards: getCards(GameType.TShirtAndNumber),
          gameType: GameType.TShirtAndNumber,
        }}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />,
    );

    getCards(GameType.TShirtAndNumber)
      .filter((a) => a.value >= 0)
      .forEach((card) => {
        const cardElement = view.container.querySelector(`#card-${card.displayValue}`);
        expect(cardElement).toBeInTheDocument();
        const cardValueElement = screen.queryAllByText(card.displayValue);
        expect(cardValueElement.length).toBeGreaterThan(0);
      });
  });
  it('should display correct card values for Custom type', () => {
    const view = render(
      <CardPicker
        game={{
          ...mockGame,

          gameType: GameType.TShirtAndNumber,
        }}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />,
    );

    mockGame.cards
      .filter((a) => a.value >= 0)
      .forEach((card) => {
        const cardElement = view.container.querySelector(`#card-${card.displayValue}`);
        expect(cardElement).toBeInTheDocument();
        const cardValueElement = screen.queryAllByText(card.displayValue);
        expect(cardValueElement.length).toBeGreaterThan(0);
      });
  });
  it('should update player value when player clicks on a card', () => {
    const currentPlayerId = mockPlayers[0].id;
    const updatePlayerValueSpy = jest.spyOn(playersService, 'updatePlayerValue');
    jest.spyOn(cardConfigs, 'getRandomEmoji').mockReturnValue('something');
    render(<CardPicker game={mockGame} players={mockPlayers} currentPlayerId={currentPlayerId} />);
    const cardValueElement = screen.queryAllByText(1);
    userEvent.click(cardValueElement[0]);
    expect(updatePlayerValueSpy).toHaveBeenCalled();
    expect(updatePlayerValueSpy).toHaveBeenCalledWith(mockGame.id, currentPlayerId, 1, 'something');
  });

  it('should not update player value when player clicks on a card and game is finished', () => {
    const currentPlayerId = mockPlayers[0].id;
    jest.resetAllMocks();
    const updatePlayerValueSpy = jest.spyOn(playersService, 'updatePlayerValue');
    const finishedGameMock = {
      ...mockGame,
      gameStatus: Status.Finished,
    };
    render(
      <CardPicker
        game={finishedGameMock}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />,
    );
    const cardValueElement = screen.queryAllByText(1);
    userEvent.click(cardValueElement[0]);
    expect(updatePlayerValueSpy).toHaveBeenCalledTimes(0);
  });
  it('should display Click on the card to vote when game is not finished', () => {
    const currentPlayerId = mockPlayers[0].id;

    render(<CardPicker game={mockGame} players={mockPlayers} currentPlayerId={currentPlayerId} />);
    const helperText = screen.getByText('Click on the card to vote');

    expect(helperText).toBeInTheDocument();
  });
  it('should display wait message to vote when game is finished', () => {
    const currentPlayerId = mockPlayers[0].id;
    const finishedGameMock = {
      ...mockGame,
      gameStatus: Status.Finished,
    };
    render(
      <CardPicker
        game={finishedGameMock}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />,
    );
    const helperText = screen.getByText(
      'Session not ready for Voting! Wait for moderator to start',
    );

    expect(helperText).toBeInTheDocument();
  });
});
