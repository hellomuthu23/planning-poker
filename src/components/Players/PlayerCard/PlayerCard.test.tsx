import { render, screen } from '@testing-library/react';
import React from 'react';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { PlayerCard } from './PlayerCard';


describe('PlayerCard component', () => {
  const mockGame: Game = {
    id: 'xyz',
    name: 'testGame',
    createdBy: 'someone',
    createdAt: new Date(),
    average: 0,
    createdById: 'abc',
    gameStatus: Status.InProgress,
  };
  const mockPlayer: Player =
    { id: 'a1', name: 'SpiderMan', status: Status.InProgress, value: 0 };

  it('should display Player name', () => {
    render(
      <PlayerCard
        game={mockGame}
        player={mockPlayer}
      />
    );

    expect(screen.getByText(mockPlayer.name)).toBeInTheDocument();
  });

  it('should display thinking emoji when Player has not voted', () => {
    render(
      <PlayerCard
        game={mockGame}
        player={mockPlayer}
      />
    );

    expect(screen.getByText('🤔')).toBeInTheDocument();
  });
  it('should display thumbs up emoji when Player has voted', () => {
    const votedPlayer = { ...mockPlayer, status: Status.Finished };
    render(
      <PlayerCard
        game={mockGame}
        player={votedPlayer}
      />
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
      />
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
      />
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
      />
    );

    expect(screen.getByText('🤔')).toBeInTheDocument();
  });

});
