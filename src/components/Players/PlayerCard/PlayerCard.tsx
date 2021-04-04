import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { GameContext } from '../../../state/context';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { cards } from '../CardPicker/CardPicker';
import './PlayerCard.css';
interface PlayerCardProps {
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { state } = useContext(GameContext);

  return (
    <Card
      variant='outlined'
      className='PlayerCard'
      style={{ background: getCardColor(state, player.value) }}
    >
      <CardHeader className='PlayerCardTitle' title={player.name} />
      <CardContent className='PlayerCardContent'>
        <Typography variant='h2' className='PlayerCardContentMiddle'>
          {getCardValue(player, state)}
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
