import React from 'react';
import { Game } from '../../types/game';
import { Player } from '../../types/player';
import { GameController } from '../Poker/GameController/GameController';
import { PlayerCard } from './PlayerCard/PlayerCard';
import './Players.css';

interface PlayersProps {
  game: Game;
}
export const Players: React.FC<PlayersProps> = ({ game }) => {
  return (
    <div>
      <div className='PlayersContainer'>
        {game.players.map((player: Player) => (
          <PlayerCard key={player.id} game={game} player={player} />
        ))}
      </div>

      <GameController game={game} />

      <div className='PlayersContainer'>
        {game.players.map((player: Player) => (
          <PlayerCard key={player.id} game={game} player={player} />
        ))}
      </div>
    </div>
  );
};
