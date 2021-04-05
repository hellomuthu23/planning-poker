import React, { useReducer } from 'react';
import { GameContext } from '../../../state/context';
import { gameReducer } from '../../../state/reducer';
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
  const [state, dispatch] = useReducer(gameReducer, game);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <div className='ContentArea'>
        <Players />
      </div>
      <div className='Footer'>
        <CardPicker currentPlayerId={currentPlayerId} />
      </div>
    </GameContext.Provider>
  );
};

export default GameArea;
