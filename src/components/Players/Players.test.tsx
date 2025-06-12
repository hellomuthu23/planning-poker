import { render, screen } from '@testing-library/react';
import { Game } from '../../types/game';
import { Player } from '../../types/player';
import { Status } from '../../types/status';
import { Players } from './Players';

describe('Players component', () => {
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
  it('should display all players', () => {
    render(<Players game={mockGame} players={mockPlayers} currentPlayerId={mockCurrentPlayerId} />);

    mockPlayers.forEach((player: Player) => {
      expect(screen.getByText(player.name)).toBeInTheDocument();
    });
  });
});
