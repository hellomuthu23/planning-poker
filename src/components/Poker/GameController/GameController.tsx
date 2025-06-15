import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { AlertDialog } from '../../../components/AlertDialog/AlertDialog';
import { finishGame, removeGame, resetGame, updateStoryName } from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import { isModerator } from '../../../utils/isModerator';

interface GameControllerProps {
  game: Game;
  currentPlayerId: string;
}

export const GameController: React.FC<GameControllerProps> = ({ game, currentPlayerId }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const copyInviteLink = () => {
    const url = `${window.location.origin}/join/${game.id}`;
    navigator.clipboard.writeText(url);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 5000);
  };

  const leaveGame = () => {
    history.push(`/`);
  };

  const handleRemoveGame = async (recentGameId: string) => {
    await removeGame(recentGameId);
    window.location.href = '/';
  };

  return (
    <div className='flex flex-col items-center w-full px-2'>
      <div className='w-full max-w-md bg-[#e7edf3] border border-gray-200 rounded-xl shadow-lg my-6'>
        {/* Card Header */}
        <div className='flex items-center justify-between px-3 py-1 border-b border-gray-400'>
          <div className='text-lg font-semibold truncate'>{game.name}</div>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>
              {game.gameStatus} {getGameStatusIcon(game.gameStatus)}
            </span>
            {game.gameType !== GameType.TShirt &&
              game.gameType !== GameType.TShirtAndNumber &&
              game.gameType !== GameType.Custom && (
                <>
                  <div className='mx-2 h-6 border-l border-gray-300' />
                  <span className='text-sm font-medium'>{t('GameController.average')}:</span>
                  <span
                    className='text-sm font-bold'
                    title={`Exact: ${(game.average || 0).toFixed(2)}`}
                  >
                    {Math.round(game.average) || 0}
                  </span>
                </>
              )}
          </div>
        </div>
        {/* Card Content */}
        <div className='flex flex-wrap justify-center gap-6 px-2 py-8'>
          {isModerator(game.createdById, currentPlayerId, game.isAllowMembersToManageSession) && (
            <>
              {/* Reveal */}
              <div className='flex flex-col items-center'>
                <button
                  onClick={() => finishGame(game.id)}
                  data-testid='reveal-button'
                  className='p-2 cursor-pointer rounded-full bg-white hover:bg-green-200 transition'
                  title={t('GameController.reveal')}
                >
                  {/* Eye Icon */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-9 w-9 text-green-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                </button>
                <span className='text-xs mt-1'>{t('GameController.reveal')}</span>
              </div>
              {/* Restart */}
              <div className='flex flex-col items-center'>
                <button
                  onClick={() => resetGame(game.id)}
                  data-testid='restart-button'
                  className='p-2 cursor-pointer rounded-full bg-white hover:bg-red-200 transition'
                  title={t('GameController.restart')}
                >
                  {/* Refresh Icon */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-9 w-9 text-red-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 4v5h5M20 20v-5h-5M5.5 9A7 7 0 0112 5a7 7 0 017.5 4.5M18.5 15A7 7 0 0112 19a7 7 0 01-7.5-4.5'
                    />
                  </svg>
                </button>
                <span className='text-xs mt-1'>{t('GameController.restart')}</span>
              </div>
              {/* Delete */}
              <div className='flex flex-col items-center'>
                <AlertDialog
                  id={game.id}
                  message={t('GameController.areYouSureDelete')}
                  onConfirm={() => handleRemoveGame(game.id)}
                  data-testid='delete-button-dialog'
                >
                  <button
                    className='p-2 cursor-pointer rounded-full bg-white hover:bg-red-200 transition'
                    title={t('GameController.delete')}
                  >
                    {/* Trash Icon */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-9 w-9 text-red-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </AlertDialog>
                <span className='text-xs mt-1'>{t('GameController.delete')}</span>
              </div>
            </>
          )}
          {/* Exit */}
          <div className='flex flex-col items-center'>
            <button
              onClick={leaveGame}
              data-testid='exit-button'
              className='p-2  cursor-pointer rounded-full bg-white hover:bg-orange-100 transition'
              title={t('GameController.exit')}
            >
              {/* Exit Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-9 w-9 text-orange-300'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1'
                />
              </svg>
            </button>
            <span className='text-xs mt-1'>{t('GameController.exit')}</span>
          </div>
          {/* Invite */}
          <div className='flex flex-col items-center' title='Copy invite link'>
            <button
              onClick={copyInviteLink}
              data-testid='invite-button'
              className='p-2 cursor-pointer rounded-full bg-white hover:bg-blue-200 transition'
              title={t('GameController.invite')}
            >
              {/* Link Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-9 w-9 text-blue-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M20 12v7a1 1 0 01-1 1H5a1 1 0 01-1-1v-7'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M8 12l4 4m0 0l4-4m-4 4V4' />
              </svg>
            </button>
            <span className='text-xs mt-1'>{t('GameController.invite')}</span>
          </div>
          {/* <div className='w-full border-b border-gray-400' /> */}
          <div className='w-full text-xs text-gray-500 mt-2'>
            <label className='font-semibold'>{t('GameController.storyName')}:</label>
            <input
              placeholder={t('GameController.enterStoryName')}
              className='w-full italic p-2 mt-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400'
              type='text'
              data-testid='story-name-input'
              value={game.storyName || ''}
              onChange={(event) => {
                updateStoryName(game.id, event.target.value || '');
              }}
            />
          </div>
        </div>
      </div>
      {/* Snackbar/Alert */}
      {showCopiedMessage && (
        <div className='fixed top-6 right-6 z-50'>
          <div
            className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow'
            role='alert'
          >
            <span className='block font-bold'>{t('GameController.inviteLinkCopied')}!</span>
          </div>
        </div>
      )}
    </div>
  );
};

const getGameStatusIcon = (gameStatus: string) => {
  switch (gameStatus) {
    case 'In Progress':
      return '⏱️';
    case 'Finished':
      return '🎉';
    default:
      return '🚀';
  }
};
