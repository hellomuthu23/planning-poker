import { render, screen } from '@testing-library/react';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { GameArea } from './GameArea';

describe('GameArea component', () => {
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
  const mockPlayers: Player[] = [
    { id: 'a1', name: 'SpiderMan', status: Status.InProgress, value: 0 },
    { id: 'a2', name: 'IronMan', status: Status.Finished, value: 3 },
  ];
  const mockCurrentPlayerId = mockPlayers[0].id;
  it('should display players', () => {
    render(
      <GameArea game={mockGame} players={mockPlayers} currentPlayerId={mockCurrentPlayerId} />,
    );

    mockPlayers.forEach((player: Player) => {
      expect(screen.getByText(player.name)).toBeInTheDocument();
    });
  });

  it('should display game controller with name', () => {
    render(
      <GameArea game={mockGame} players={mockPlayers} currentPlayerId={mockCurrentPlayerId} />,
    );
    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
  });
  it('should display card picker', () => {
    render(
      <GameArea game={mockGame} players={mockPlayers} currentPlayerId={mockCurrentPlayerId} />,
    );

    expect(screen.queryAllByText('1')).toHaveLength(3);
  });
});
