import React, { useReducer } from 'react';
import { GameContext } from '../../../state/context';
import { gameReducer } from '../../../state/reducer';
import { Game } from '../../../types/game';
import { CardPicker } from '../../Players/CardPicker/CardPicker';
import { Players } from '../../Players/Players';
import './GameArea.css';

interface GameAreaProps {
  game: Game;
}
export const GameArea: React.FC<GameAreaProps> = ({ game }) => {
  const [state, dispatch] = useReducer(gameReducer, game);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <div className='ContentArea'>
        <Players />
        {/* <div className='RightPanel'>
          <AddPlayer />
        </div> */}
      </div>
      <div className='Footer'>
        <CardPicker />
      </div>
    </GameContext.Provider>
  );
};

export default GameArea;
