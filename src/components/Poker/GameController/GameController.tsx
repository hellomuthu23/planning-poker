import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { AlertDialog } from '../../../components/AlertDialog/AlertDialog';
import {
  finishGame,
  removeGame,
  resetGame,
  updateGame,
  updateStoryName,
} from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { isModerator } from '../../../utils/isModerator';
import { ExitSVG } from '../../SVGs/Exit';
import { EyeSVG } from '../../SVGs/Eye';
import { LinkSVG } from '../../SVGs/Link';
import { RefreshSVG } from '../../SVGs/Refresh';
import { TrashSVG } from '../../SVGs/Trash';

interface GameControllerProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}

export const GameController: React.FC<GameControllerProps> = ({
  game,
  players,
  currentPlayerId,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  useEffect(() => {
    if (
      game.autoReveal &&
      game.gameStatus === 'In Progress' &&
      Array.isArray(players) &&
      players.length > 0 &&
      players.every((p: Player) => p.status === Status.Finished)
    ) {
      finishGame(game.id);
    }
  }, [
    game.autoReveal,
    game,
    JSON.stringify(players.map((p) => ({ id: p.id, value: p.value, status: p.status }))),
  ]);

  const onAutoReveal = (value: boolean) => {
    updateGame(game.id, { autoReveal: value });
  };

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
      <div className='w-full max-w-md bg-[#e7edf3] border border-gray-200 rounded-xl shadow-lg my-5'>
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
                    className='text-sm font-semibold text-blue-400  underline'
                    title={`Rounded: ${Math.round(game.average) || 0}`}
                  >
                    {(game.average || 0).toFixed(2)}
                  </span>
                </>
              )}
          </div>
        </div>
        {isMod && (
          <div
            className='flex justify-end p-2'
            title='Auto Reveal when all members finished voting'
          >
            <AutoReveal
              autoReveal={game.autoReveal || false}
              onAutoReveal={(value) => onAutoReveal(value)}
            />
          </div>
        )}
        {/* Card Content */}
        <div className='flex flex-wrap justify-center gap-6 px-2 pt-8 pb-2'>
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

interface AutoRevealProps {
  autoReveal: boolean;
  onAutoReveal: (autoReveal: boolean) => void;
}

export const AutoReveal: React.FC<AutoRevealProps> = ({ autoReveal, onAutoReveal }) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center'>
      <label className='flex items-center cursor-pointer'>
        <span className='mr-1 text-xs'>{t('GameController.autoReveal')}</span>
        <button
          type='button'
          role='switch'
          aria-checked={autoReveal}
          onClick={() => onAutoReveal(!autoReveal)}
          className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none ${
            autoReveal ? 'bg-green-500' : 'bg-gray-300'
          }`}
          style={{ minWidth: '2rem' }}
        >
          <span
            className={`inline-block h-3 w-3 cursor-pointer transform rounded-full bg-white shadow transition-transform ${
              autoReveal ? 'translate-x-4' : 'translate-x-1'
            }`}
          />
        </button>
      </label>
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
