import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { updatePlayerValue } from '../../../service/games';
import { Game } from '../../../types/game';
import './CardPicker.css';

export interface CardConfig {
  value: number;
  color: string;
}
export const cards: CardConfig[] = [
  { value: 0, color: 'white' },
  { value: 1, color: '#CCFFFF' },
  { value: 3, color: '#CCFFFF' },
  { value: 5, color: '#CCFFFF' },
  { value: 8, color: '#CCFFFF' },
  { value: 13, color: '#FFCCCC' },
  { value: 21, color: '#FFCCCC' },
  { value: 34, color: '#FFCCCC' },
  { value: 55, color: '#FFCCCC' },
  { value: 89, color: '#FFCCCC' },
];

interface CardPickerProps {
  game: Game;
  currentPlayerId: string;
}
export const CardPicker: React.FC<CardPickerProps> = ({
  game,
  currentPlayerId,
}) => {
  const playPlayer = (gameId: string, playerId: string, card: CardConfig) => {
    updatePlayerValue(gameId, playerId, card.value);
  };
  return (
    <div className='CardPickerContainer'>
      {cards.map((card: CardConfig) => (
        <Card
          className='CardPicker'
          variant='outlined'
          onClick={() => playPlayer(game.id, currentPlayerId, card)}
          key={card.value}
          style={getCardStyle(game, currentPlayerId, card)}
        >
          <CardContent className='CardContent'>
            <Typography className='CardContentTop'>{card.value}</Typography>
            <Typography className='CardContentMiddle' variant='h2'>
              {card.value}
            </Typography>
            <Typography className='CardContentBottom'>{card.value}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const getCardStyle = (game: Game, playerId: string, card: CardConfig) => {
  const player = game.players.find((player) => player.id === playerId);
  if (player && player.value !== undefined && player.value === card.value) {
    return {
      marginTop: '0px',
      background: card.color,
      border: '1px dashed #333',
    };
  }
  return { background: card.color };
};
