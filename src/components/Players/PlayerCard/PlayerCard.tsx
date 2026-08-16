import React from 'react';
import { removePlayer } from '../../../service/players';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { isModerator } from '../../../utils/isModerator';
import { TrashSVG } from '../../SVGs/Trash';
import { getCards } from '../CardPicker/CardConfigs';

interface PlayerCardProps {
  game: Game;
  player: Player;
  currentPlayerId: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ game, player, currentPlayerId }) => {
  const removeUser = (gameId: string, playerId: string) => {
    removePlayer(gameId, playerId);
  };

  return (
    <div
      className='rounded shadow-lg w-25 bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-600 border mb-2 m-3'
      style={{
        backgroundColor: getCardColor(game, player.value),
      }}
    >
      <div className='relative text-center -mt-5 mx-auto w-[95%] bg-white dark:bg-gray-900 border-2  border-gray-400 dark:border-gray-700 rounded-2xl flex items-center justify-center px-3 py-1'>
        <div className='min-h-11 w-full flex items-center justify-center' title={player.name}>
          <div className='text-center font-semibold text-sm leading-tight break-words line-clamp-2'>
            {player.name}
          </div>
        </div>
        {isModerator(game.createdById, currentPlayerId, game.isAllowMembersToManageSession) &&
          player.id !== currentPlayerId && (
            <button
              title='Remove'
              className='cursor-pointer absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 hover:bg-red-100 dark:hover:bg-red-950 shadow-md border-2 border-red-400 transition'
              onClick={() => removeUser(game.id, player.id)}
              data-testid='remove-button'
            >
              <TrashSVG className='h-3 w-3 text-red-400' />
            </button>
          )}
      </div>
      <div className='flex items-center justify-center text-gray-800 py-6 mb-3'>
        <span className={`${getCardValue(player, game)?.length < 2 ? 'text-4xl' : 'text-3xl'}`}>
          {getCardValue(player, game)}
        </span>
      </div>
    </div>
  );
};

const getCardColor = (game: Game, value: number | undefined): string => {
  if (game.gameStatus == Status.Finished) {
    const card = getCards(game.gameType).find((card) => card.value === value);
    return card ? card.color : '';
  }
  return '';
};

const getCardValue = (player: Player, game: Game) => {
  if (game.gameStatus !== Status.Finished) {
    return player.status === Status.Finished ? '👍' : '🤔';
  }

  if (game.gameStatus === Status.Finished) {
    if (player.status === Status.Finished) {
      if (player.value && player.value === -1) {
        return player.emoji || '☕'; // coffee emoji
      }
      return getCardDisplayValue(game, player.value);
    }
    return '🤔';
  }
  return '';
};

const getCardDisplayValue = (game: Game, cardValue: number | undefined): string => {
  const cards = game.cards?.length > 0 ? game.cards : getCards(game.gameType);
  return (
    cards.find((card) => card.value === cardValue)?.displayValue || cardValue?.toString() || ''
  );
};
