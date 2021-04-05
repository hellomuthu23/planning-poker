import React, { useContext } from 'react';
import { GameContext } from '../../state/context';
import { setPlayerValue } from '../../state/reducer';
import { Player } from '../../types/player';
import { GameController } from '../Poker/GameController/GameController';
import { PlayerCard } from './PlayerCard/PlayerCard';
import './Players.css';

export const Players = () => {
  const { state, dispatch } = useContext(GameContext);
  const playPlayer = (id: string) => {
    const randomValue = Math.floor(Math.random() * 100);
    dispatch(setPlayerValue(id, randomValue));
  };
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
