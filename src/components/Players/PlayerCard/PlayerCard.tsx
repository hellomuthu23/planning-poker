import React from 'react';
import { removePlayer } from '../../../service/players';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { isModerator } from '../../../utils/isModerator';
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
      className='rounded shadow-lg w-25 border-gray-300 border bg-white mb-2 m-10'
      style={{
        backgroundColor: getCardColor(game, player.value),
      }}
    >
      <div className='text-center -mt-5 mx-auto w-[88%] bg-white border-2  border-gray-400 rounded-2xl flex items-center justify-between px-4 py-2'>
        <div className='font-semibold text-sm truncate' title={player.name}>
          {player.name}
        </div>
        {isModerator(game.createdById, currentPlayerId, game.isAllowMembersToManageSession) &&
          player.id !== currentPlayerId && (
            <button
              title='Remove'
              className='cursor-pointer ml-2 p-1 rounded hover:bg-red-100 transition'
              onClick={() => removeUser(game.id, player.id)}
              data-testid='remove-button'
            >
              {/* Trash/Delete SVG Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 text-red-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          )}
      </div>
      <div className='flex items-center justify-center py-6 mb-3'>
        <span className={`${getCardValue(player, game)?.length < 2 ? 'text-4xl' : 'text-3xl'}`}>
          {getCardValue(player, game)}
        </span>
      </div>
    </div>
  );
};

const getCardColor = (game: Game, value: number | undefined): string => {
  if (game.gameStatus !== Status.Finished) {
    return 'var(--color-background-secondary)';
  }
  const card = getCards(game.gameType).find((card) => card.value === value);
  return card ? card.color : 'var(--color-background-secondary)';
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
