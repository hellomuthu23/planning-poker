import React, { useContext } from 'react';
import { GameContext } from '../../state/context';
import { Player } from '../../types/player';
import { GameController } from '../Poker/GameController/GameController';
import { PlayerCard } from './PlayerCard/PlayerCard';
import './Players.css';

export const Players = () => {
  const { state } = useContext(GameContext);

  return (
    <div>
      <div className='PlayersContainer'>
        {state &&
          state.players.map((player: Player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
      </div>
      <GameController />
      <div className='PlayersContainer'>
        {state &&
          state.players.map((player: Player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
      </div>
    </div>
  );
};
