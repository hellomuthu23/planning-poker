import React from 'react';
import { Game, GameType } from '../../../types/game';
import { Player } from '../../../types/player';
import { CardPicker } from '../../Players/CardPicker/CardPicker';
import { Players } from '../../Players/Players';
import { GameController } from '../GameController/GameController';
import './GameArea.css';
import { TshirtLegend } from '../TshirtLegend/TshirtLegend';

interface GameAreaProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}
export const GameArea: React.FC<GameAreaProps> = ({ game, players, currentPlayerId }) => {
  return (
    <>
      <div className='ContentArea'>
        <Players game={game} players={players} currentPlayerId={currentPlayerId} />
        <GameController game={game} currentPlayerId={currentPlayerId} />
      </div>
      <div className='Footer'>
        <CardPicker game={game} players={players} currentPlayerId={currentPlayerId} />
      </div>
      { (game.gameType === GameType.TShirt || game.gameType === GameType.TShirtAndNumber) && (
        <div className='Footer'>
          <TshirtLegend></TshirtLegend>
        </div>
      )}
    </>
  );
};

export default GameArea;
