import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';
import { Game, GameType } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { getCards } from '../CardPicker/CardConfigs';
import './PlayerCard.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { removePlayer } from '../../../service/players';
interface PlayerCardProps {
  game: Game;
  player: Player;
  currentPlayerId: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ game, player, currentPlayerId }) => {
  return (
    <Card
      variant='outlined'
      className='PlayerCard'
      style={{
        backgroundColor: getCardColor(game, player.value),
      }}
    >
      <CardHeader
        className='PlayerCardTitle'
        title={player.name}
        titleTypographyProps={{ variant: 'subtitle2', noWrap: true }}
      />
      {currentPlayerId === game.createdById && player.id !== game.createdById && (
        <HighlightOffIcon
          onClick={() => removePlayer(game.id, player)}
          className='PlayerCardRemove'
          color='primary'
          fontSize='small'
        />
      )}

      <CardContent className='PlayerCardContent'>
        <Typography variant='h2' className='PlayerCardContentMiddle'>
          {getCardValue(player, game)}
        </Typography>

        {/* <Button
          size='small'
          title='Remove user'
          startIcon={<HighlightOffIcon />}
          color='primary'
          onClick={() => alert('remove')}
        >
          Remove
        </Button> */}
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
      return getCardDisplayValue(game.gameType, player.value);
    }
    return '🤔';
  }
};

const getCardDisplayValue = (
  gameType: GameType | undefined,
  cardValue: number | undefined
): string | number | undefined => {
  return getCards(gameType).find((card) => card.value === cardValue)?.displayValue || cardValue;
};
