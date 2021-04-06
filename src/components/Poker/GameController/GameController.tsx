import { Button, Card, CardContent } from '@material-ui/core';
import React from 'react';
import { finishGame, resetGame } from '../../../service/games';
import { Game } from '../../../types/game';
import './GameController.css';

interface GameControllerProps {
  game: Game;
}

export const GameController: React.FC<GameControllerProps> = ({ game }) => {
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
    <div className='GameController'>
      <Card variant='outlined' className='GameControllerCard'>
        <CardContent className='GameControllerCardContentArea'>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => finishGame(game.id)}
            className='RevealButton'
          >
            Reveal
          </Button>
          <Button
            className='NewGameButton'
            variant='contained'
            color='primary'
            onClick={() => resetGame(game.id)}
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
