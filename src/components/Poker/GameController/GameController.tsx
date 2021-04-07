import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
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
        <CardHeader
          title={game.name}
          action={
            <Typography
              className='GameControllerCardHeaderAverage'
              variant='h5'
            >
              Average: {game.average}
            </Typography>
          }
          className='GameControllerCardTitle'
        ></CardHeader>
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
