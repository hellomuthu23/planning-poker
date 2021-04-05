import { Button, Card, CardContent } from '@material-ui/core';
import React, { useContext } from 'react';
import { GameContext } from '../../../state/context';
import { finishGame, resetGame } from '../../../state/reducer';
import './GameController.css';

export const GameController = () => {
  const { state, dispatch } = useContext(GameContext);
  const endGame = () => {
    dispatch(finishGame());
  };
  const copyInviteLink = () => {
    const dummy = document.createElement('input'),
      text = window.location.href + '/join';
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };
  return (
    <div className='RevealArea'>
      <Card variant='outlined' className='RevealCard'>
        <CardContent className='RevealCardContentArea'>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => endGame()}
            className='RevealButton'
          >
            Reveal
          </Button>
          <Button
            className='NewGameButton'
            variant='contained'
            color='primary'
            onClick={() => dispatch(resetGame())}
          >
            Start New Game
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => copyInviteLink()}
          >
            Copy Invite Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
