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
      style={{ background: getCardColor(game, player.value) }}
    >
      <CardHeader className='PlayerCardTitle' title={player.name} />
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
    return 'white';
  }
  const card = cards.find((card) => card.value === value);
  return card ? card.color : 'white';
};

const getCardValue = (player: Player, game: Game) => {
  if (game.gameStatus === Status.InProgress) {
    return player.status === Status.Finished ? '👍' : '🤔';
  }
  if (game.gameStatus === Status.Finished) {
    return player.status === Status.Finished ? player.value : '🤔';
  }
};
