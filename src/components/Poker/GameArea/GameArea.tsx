import React from 'react';
import { Game } from '../../../types/game';
import { CardPicker } from '../../Players/CardPicker/CardPicker';
import { Players } from '../../Players/Players';
import './GameArea.css';

interface GameAreaProps {
  game: Game;
  currentPlayerId: string;
}
export const GameArea: React.FC<GameAreaProps> = ({
  game,
  currentPlayerId,
}) => {
  return (
    <>
      <div className='ContentArea'>
        <Players game={game} />
      </div>
      <div className='Footer'>
        <CardPicker game={game} currentPlayerId={currentPlayerId} />
      </div>
    </>
  );
};

export default GameArea;
