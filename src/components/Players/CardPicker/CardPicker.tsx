import { Card, CardContent, Grow, Typography } from '@material-ui/core';
import React from 'react';
import { updatePlayerValue } from '../../../service/players';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import './CardPicker.css';

export interface CardConfig {
  value: number;
  color: string;
}
export const cards: CardConfig[] = [
  { value: 0, color: '#F4F7FA' },
  { value: 1, color: '#9EC8FE' },
  { value: 2, color: '#9EC8FE' },
  { value: 3, color: '#A3DFF2' },
  { value: 5, color: '#A3DFF2' },
  { value: 8, color: '#9DD49A' },
  { value: 13, color: '#9DD49A' },
  { value: 21, color: '#F4DD94' },
  { value: 34, color: '#F4DD94' },
  { value: 55, color: '#F39893' },
  { value: 89, color: '#F39893' },
];

interface CardPickerProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}
export const CardPicker: React.FC<CardPickerProps> = ({
  game,
  players,
  currentPlayerId,
}) => {
  const playPlayer = (gameId: string, playerId: string, card: CardConfig) => {
    if (game.gameStatus !== Status.Finished) {
      updatePlayerValue(gameId, playerId, card.value);
    }
  };
  return (
    <Grow in={true} timeout={4000}>
      <div>
        <div className='CardPickerContainer'>
          {cards.map((card: CardConfig) => (
            <Card
              className='CardPicker'
              variant='outlined'
              onClick={() => playPlayer(game.id, currentPlayerId, card)}
              key={card.value}
              style={{
                ...getCardStyle(players, currentPlayerId, card),
                pointerEvents: getPointerEvent(game),
              }}
            >
              <CardContent className='CardContent'>
                <Typography className='CardContentTop' variant='caption'>
                  {card.value}
                </Typography>
                <Typography className='CardContentMiddle' variant='h4'>
                  {card.value}
                </Typography>
                <Typography className='CardContentBottom' variant='caption'>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        <Typography>Click on the card to vote</Typography>
      </div>
    </Grow>
  );
};

const getCardStyle = (
  players: Player[],
  playerId: string,
  card: CardConfig
) => {
  const player = players.find((player) => player.id === playerId);
  if (player && player.value !== undefined && player.value === card.value) {
    return {
      marginTop: '-2px',
      background: card.color,
      border: '1px solid #333',
    };
  }
  return { background: card.color };
};

const getPointerEvent = (game: Game) => {
  if (game.gameStatus === Status.Finished) {
    return 'none';
  }
  return 'inherit';
};
