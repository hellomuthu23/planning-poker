import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { GameContext } from '../../../state/context';
import { resetGame } from '../../../state/reducer';
import './GameStatus.css';

export const GameStatus = () => {
  const { state, dispatch } = useContext(GameContext);
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => dispatch(resetGame())}
    >
      Start New Game
    </Button>
  );
};
