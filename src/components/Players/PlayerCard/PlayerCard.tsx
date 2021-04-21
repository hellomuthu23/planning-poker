import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { cards } from '../CardPicker/CardPicker';
import './PlayerCard.css';
interface PlayerCardProps {
  game: Game;
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ game, player }) => {
  return (
    <Card
      variant='outlined'
      className='PlayerCard'
      style={{
        background: getCardColor(game, player.value),
      }}
    >
      <CardHeader
        className='PlayerCardTitle'
        title={player.name}
        titleTypographyProps={{ variant: 'subtitle2', noWrap: true }}
      />
      <CardContent className='PlayerCardContent'>
        <Typography variant='h2' className='PlayerCardContentMiddle'>
          {getCardValue(player, game)}
        </Typography>
      </CardContent>
    </Card>
  );
};

const getCardColor = (game: Game, value: number | undefined): string => {
  if (game.gameStatus !== Status.Finished) {
    return '#F4F7FA';
  }
  const card = cards.find((card) => card.value === value);
  return card ? card.color : '#F4F7FAe';
};

const getCardValue = (player: Player, game: Game) => {
  if (game.gameStatus !== Status.Finished) {
    return player.status === Status.Finished ? '👍' : '🤔';
  }

  if (game.gameStatus === Status.Finished) {
    if (player.status === Status.Finished) {
      if (player.value && player.value === -1) {
        return '☕' // coffee emoji
      }
      return player.value
    }
    return '🤔';
  }
};
