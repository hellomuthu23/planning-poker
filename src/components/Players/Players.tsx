import { Grow } from '@material-ui/core';
import React from 'react';
import { Game } from '../../types/game';
import { Player } from '../../types/player';
import { PlayerCard } from './PlayerCard/PlayerCard';
import './Players.css';

interface PlayersProps {
  game: Game;
  players: Player[];
}
export const Players: React.FC<PlayersProps> = ({ game, players }) => {
  return (
    <Grow in={true} timeout={800}>
      <div className='PlayersContainer'>
        {players.map((player: Player) => (
          <PlayerCard key={player.id} game={game} player={player} />
        ))}
      </div>
    </Grow>
  );
};
