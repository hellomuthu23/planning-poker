import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { PlayerCard } from './PlayerCard';
import * as playerService from '../../../service/players';

// Mock the playerService module
jest.mock('../../../service/players', () => ({
  removePlayer: jest.fn(),
  isModerator: jest.fn(),
}));

describe('PlayerCard component', () => {
  // Setup and teardown for each test
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

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
  const mockPlayer: Player = { id: 'a1', name: 'SpiderMan', status: Status.InProgress, value: 0 };
  let mockCurrentPlayerId = mockPlayer.id;
  it('should display Player name', () => {
    render(
      <PlayerCard game={mockGame} player={mockPlayer} currentPlayerId={mockCurrentPlayerId} />,
    );

    expect(screen.getByText(mockPlayer.name)).toBeInTheDocument();
  });

  it('should display thinking emoji when Player has not voted', () => {
    render(
      <PlayerCard game={mockGame} player={mockPlayer} currentPlayerId={mockCurrentPlayerId} />,
    );

    expect(screen.getByText('🤔')).toBeInTheDocument();
  });
  it('should display thumbs up emoji when Player has voted', () => {
    const votedPlayer = { ...mockPlayer, status: Status.Finished };
    render(
      <PlayerCard game={mockGame} player={votedPlayer} currentPlayerId={mockCurrentPlayerId} />,
    );

    expect(screen.getByText('👍')).toBeInTheDocument();
  });

  it('should display coffee up emoji when Player has voted but value is -1 and Game is finished', () => {
    const coffeePlayer = { ...mockPlayer, status: Status.Finished, value: -1 };
    const finishedGame = { ...mockGame, gameStatus: Status.Finished };
    render(
      <PlayerCard
        game={finishedGame}
        player={coffeePlayer}
        currentPlayerId={mockCurrentPlayerId}
      />,
    );

    expect(screen.getByText('☕')).toBeInTheDocument();
  });

  it('should display correct when Player has voted and Game is finished', () => {
    const coffeePlayer = { ...mockPlayer, status: Status.Finished, value: 5 };
    const finishedGame = { ...mockGame, gameStatus: Status.Finished };
    render(
      <PlayerCard
        game={finishedGame}
        player={coffeePlayer}
        currentPlayerId={mockCurrentPlayerId}
      />,
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });
  it('should display thinking emoji when Player has not voted and Game is finished', () => {
    const coffeePlayer = { ...mockPlayer, status: Status.InProgress };
    const finishedGame = { ...mockGame, gameStatus: Status.Finished };
    render(
      <PlayerCard
        game={finishedGame}
        player={coffeePlayer}
        currentPlayerId={mockCurrentPlayerId}
      />,
    );

    expect(screen.getByText('🤔')).toBeInTheDocument();
  });
  it('should display remove icon for moderator', () => {
    const coffeePlayer = { ...mockPlayer, status: Status.InProgress };
    const finishedGame = { ...mockGame, gameStatus: Status.Finished };
    render(
      <PlayerCard
        game={finishedGame}
        player={coffeePlayer}
        currentPlayerId={mockGame.createdById}
      />,
    );

    expect(screen.getByTestId('remove-button')).toBeInTheDocument();
  });
  it('should not display remove icon for non moderator', () => {
    const coffeePlayer = { ...mockPlayer, status: Status.InProgress };
    const finishedGame = { ...mockGame, gameStatus: Status.Finished };
    render(
      <PlayerCard
        game={finishedGame}
        player={coffeePlayer}
        currentPlayerId={mockCurrentPlayerId}
      />,
    );

    expect(screen.queryByTestId('remove-button')).not.toBeInTheDocument();
  });
  it('should not display remove icon for moderator card', () => {
    const coffeePlayer = { ...mockPlayer, status: Status.InProgress };
    const finishedGame = {
      ...mockGame,
      createdBy: mockCurrentPlayerId,
      gameStatus: Status.Finished,
    };
    render(
      <PlayerCard
        game={finishedGame}
        player={coffeePlayer}
        currentPlayerId={mockCurrentPlayerId}
      />,
    );

    expect(screen.queryByTestId('remove-button')).not.toBeInTheDocument();
  });
  it('should call remove function on Remove action', () => {
    const coffeePlayer = { ...mockPlayer, status: Status.InProgress };
    const finishedGame = { ...mockGame, gameStatus: Status.Finished };

    // No need to use jest.spyOn since we've already mocked the module
    render(
      <PlayerCard
        game={finishedGame}
        player={coffeePlayer}
        currentPlayerId={mockGame.createdById}
      />,
    );

    userEvent.click(screen.getByTestId('remove-button'));
    expect(playerService.removePlayer).toHaveBeenCalledWith(finishedGame.id, coffeePlayer.id);
  });
});
