import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { AlertDialog } from '../../../components/AlertDialog/AlertDialog';
import { finishGame, removeGame, resetGame, updateStoryName } from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import { isModerator } from '../../../utils/isModerator';
import { ExitSVG } from '../../SVGs/Exit';
import { EyeSVG } from '../../SVGs/Eye';
import { LinkSVG } from '../../SVGs/Link';
import { RefreshSVG } from '../../SVGs/Refresh';
import { TrashSVG } from '../../SVGs/Trash';

interface GameControllerProps {
  game: Game;
  currentPlayerId: string;
}

export const GameController: React.FC<GameControllerProps> = ({ game, currentPlayerId }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const copyInviteLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${game.id}`);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 5000);
  };

  const leaveGame = () => history.push(`/`);
  const handleRemoveGame = async (id: string) => {
    await removeGame(id);
    window.location.href = '/';
  };

  const isMod = isModerator(game.createdById, currentPlayerId, game.isAllowMembersToManageSession);

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
          {isMod && (
            <>
              <ControllerButton
                onClick={() => finishGame(game.id)}
                icon={<EyeSVG className='h-9 w-9 text-green-500' />}
                label={t('GameController.reveal')}
                colorClass='bg-green-200'
                testId='reveal-button'
              />
              <ControllerButton
                onClick={() => resetGame(game.id)}
                icon={<RefreshSVG className='h-9 w-9 text-red-400' />}
                label={t('GameController.restart')}
                colorClass='bg-red-200'
                testId='restart-button'
              />
              <ControllerButton
                icon={<TrashSVG className='h-9 w-9 text-red-500' />}
                label={t('GameController.delete')}
                colorClass='bg-red-200'
              >
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
                    <TrashSVG className='h-9 w-9 text-red-500' />
                  </button>
                </AlertDialog>
              </ControllerButton>
            </>
          )}
          <ControllerButton
            onClick={leaveGame}
            icon={<ExitSVG className='h-9 w-9 text-orange-500' />}
            label={t('GameController.exit')}
            colorClass='bg-orange-100'
            testId='exit-button'
          />
          <ControllerButton
            onClick={copyInviteLink}
            icon={<LinkSVG className='h-9 w-9 text-blue-500' />}
            label={t('GameController.invite')}
            colorClass='bg-blue-200'
            testId='invite-button'
            title='Copy invite link'
          />
          <div className='w-full text-xs text-gray-500 mt-2'>
            <label className='font-semibold'>{t('GameController.storyName')}:</label>
            <input
              placeholder={t('GameController.enterStoryName')}
              className='w-full italic p-2 mt-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400'
              type='text'
              data-testid='story-name-input'
              value={game.storyName || ''}
              onChange={(e) => updateStoryName(game.id, e.target.value || '')}
            />
          </div>
        </div>
      </div>
      {/* Snackbar/Alert */}
      {showCopiedMessage && (
        <div className='fixed top-6 right-6 z-50'>
          <div
            className='bg-green-100 border border-green-200  text-gray-800 opacity-85 px-4 py-3 text-xs rounded shadow'
            role='alert'
          >
            <span className='block font-bold'>{t('GameController.inviteLinkCopied')}!</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ControllerButton = ({
  onClick,
  icon,
  label,
  colorClass,
  testId,
  title,
  children,
}: {
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  colorClass: string;
  testId?: string;
  title?: string;
  children?: React.ReactNode;
}) => (
  <div className='flex flex-col items-center'>
    {children ? (
      children
    ) : (
      <button
        onClick={onClick}
        data-testid={testId}
        className={`p-2 cursor-pointer rounded-full bg-white hover:${colorClass} transition`}
        title={title || label}
      >
        {icon}
      </button>
    )}
    <span className='text-xs mt-1'>{label}</span>
  </div>
);

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
