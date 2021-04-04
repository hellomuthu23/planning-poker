import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { GameContext } from '../../../state/context';
import { setPlayerValue } from '../../../state/reducer';
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

export const CardPicker = () => {
  const { state, dispatch } = useContext(GameContext);
  const playPlayer = (card: CardConfig) => {
    dispatch(setPlayerValue(state.players[0].id, card.value));
  };
  return (
    <div className='CardPickerContainer'>
      {cards.map((card: CardConfig) => (
        <Card
          className='CardPicker'
          variant='outlined'
          onClick={() => playPlayer(card)}
          key={card.value}
          style={{ background: card.color }}
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
