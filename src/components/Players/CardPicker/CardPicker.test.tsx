import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import * as playersService from '../../../service/players';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { CardPicker, cards } from './CardPicker';

jest.mock('../../../service/players');
describe('CardPicker component', () => {
  const mockGame: Game = {
    id: 'xyz',
    name: 'testGame',
    createdBy: 'someone',
    createdAt: new Date(),
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
    const cardPicker = render(
      <CardPicker
        game={mockGame}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />
    );
    cards.forEach((card) => {
      const cardElement = cardPicker.container.querySelector(
        `#card-${card.value}`
      );
      expect(cardElement).toBeInTheDocument();
      const cardValueElement = screen.queryAllByText(card.value);
      expect(cardValueElement.length).toBeGreaterThan(0);
    });
  });
  it('should update player value when player clicks on a card', () => {
    const currentPlayerId = mockPlayers[0].id;
    const updatePlayerValueSpy = jest.spyOn(
      playersService,
      'updatePlayerValue'
    );
    render(
      <CardPicker
        game={mockGame}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />
    );
    const cardValueElement = screen.queryAllByText(5);
    act(() => {
      userEvent.click(cardValueElement[0]);
    });
    expect(updatePlayerValueSpy).toHaveBeenCalled();
    expect(updatePlayerValueSpy).toHaveBeenCalledWith(
      mockGame.id,
      currentPlayerId,
      5
    );
  });

  it('should not update player value when player clicks on a card and game is finished', () => {
    const currentPlayerId = mockPlayers[0].id;
    const updatePlayerValueSpy = jest.spyOn(
      playersService,
      'updatePlayerValue'
    );
    const finishedGameMock = {
      ...mockGame,
      gameStatus: Status.Finished,
    };
    render(
      <CardPicker
        game={finishedGameMock}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />
    );
    const cardValueElement = screen.queryAllByText(5);
    act(() => {
      userEvent.click(cardValueElement[0]);
    });
    expect(updatePlayerValueSpy).toHaveBeenCalledTimes(0);
  });
  it('should display Click on the card to vote when game is not finished', () => {
    const currentPlayerId = mockPlayers[0].id;

    render(
      <CardPicker
        game={mockGame}
        players={mockPlayers}
        currentPlayerId={currentPlayerId}
      />
    );
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
      />
    );
    const helperText = screen.getByText(
      'Session not ready for Voting! Wait for moderator to start'
    );

    expect(helperText).toBeInTheDocument();
  });
});
