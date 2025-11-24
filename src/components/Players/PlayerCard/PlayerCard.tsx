import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { getCards } from '../CardPicker/CardConfigs';
import './PlayerCard.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForeverTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { blue, red } from '@mui/material/colors';
import { removePlayer, updatePlayerName } from '../../../service/players';
import { isModerator } from '../../../utils/isModerator';

interface PlayerCardProps {
  game: Game;
  player: Player;
  currentPlayerId: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ game, player, currentPlayerId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);

  const removeUser = (gameId: string, playerId: string) => {
    removePlayer(gameId, playerId);
  };
  const updateUserName = (gameId: string, playerId: string, name: string) => {
    updatePlayerName(gameId, playerId, name);
    setIsEditing(false); // Edit-Modus verlassen nach dem Save
  };

  // Beim Klick auf Edit-Button
  const handleEditClick = () => {
    setEditName(player.name);
    setIsEditing(true);
  };

  // Beim Klick auf Speichern
  const handleSave = () => {
    if (editName.trim()) {
      updateUserName(game.id, player.id, editName.trim());
    }
  };

  // Beim Abbrechen
  const handleCancel = () => {
    setIsEditing(false);
    setEditName(player.name);
  };

  return (
    <Card
      variant='outlined'
      className='PlayerCard'
      style={{
        backgroundColor: getCardColor(game, player.value),
      }}
    >
      <CardHeader
        className={player.id !== currentPlayerId ? 'PlayerCardTitle' : 'PlayerCardTitle PlayerCardTitleActive'}
        title={
          isEditing && player.id === currentPlayerId ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                className={'PlayerCardTitleInput'}
                type="text"
                value={editName}
                autoFocus
                maxLength={30}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
              />
              <IconButton title="Save" onClick={handleSave} size="small" color="primary"
                          style={{padding: '0'}}>
                <SaveIcon fontSize='small' style={{ color: blue[800] }} />
              </IconButton>
              <IconButton title="Cancel" onClick={handleCancel} size="small" color="secondary"
                          style={{padding: '0'}}>
                <HighlightOffIcon fontSize='small' style={{ color: red[300] }} />
              </IconButton>
            </div>
          ) : (
            player.name
          )
        }
        slotProps={{ title: { variant: 'subtitle2', noWrap: true, title: player.name } }}
        action={
          (isModerator(game.createdById, currentPlayerId, game.isAllowMembersToManageSession) &&
          player.id !== currentPlayerId && (
            <IconButton
              title='Remove'
              className='RemoveButton'
              onClick={() => removeUser(game.id, player.id)}
              data-testid='remove-button'
              color='primary'
            >
              <DeleteForeverIcon fontSize='small' style={{ color: red[300] }} />
            </IconButton>
          )) ||
          (player.id === currentPlayerId && !isEditing &&
            (
            <IconButton
              title='Edit'
              className='EditButton'
              onClick={handleEditClick}
              data-testid='update-button'
              color='primary'
            >
              <EditIcon fontSize='small' style={{ color: blue[800] }} />
            </IconButton>
          ))
        }
      />
      <CardContent className='PlayerCardContent'>
        <Typography
          variant={getCardValue(player, game)?.length < 2 ? 'h2' : 'h3'}
          className='PlayerCardContentMiddle'
        >
          {getCardValue(player, game)}
        </Typography>
      </CardContent>
    </Card>
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
