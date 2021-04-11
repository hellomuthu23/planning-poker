import {
  Card,
  CardContent,
  CardHeader,
  Grow,
  IconButton,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';
import RefreshIcon from '@material-ui/icons/Autorenew';
import LinkIcon from '@material-ui/icons/Link';
import PersonAdd from '@material-ui/icons/PersonAdd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { finishGame, resetGame } from '../../../service/games';
import { Game } from '../../../types/game';
import './GameController.css';

interface GameControllerProps {
  game: Game;
}

export const GameController: React.FC<GameControllerProps> = ({ game }) => {
  const history = useHistory();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const copyInviteLink = () => {
    const dummy = document.createElement('input');
    const url = `${window.location.origin}/join/${game.id}`;
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    setShowCopiedMessage(true);
  };
  const joinGame = () => {
    history.push(`/join/${game.id}`);
  };

  return (
    <Grow in={true} timeout={2000}>
      <div className='GameController'>
        <Card variant='outlined' className='GameControllerCard'>
          <CardHeader
            title={game.name}
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <div className='GameControllerCardHeaderAverageContainer'>
                <Typography className='GameControllerCardHeaderAverage'>
                  Average:
                </Typography>
                <Typography className='GameControllerCardHeaderAverageValue'>
                  {game.average || 0}
                </Typography>
              </div>
            }
            className='GameControllerCardTitle'
          ></CardHeader>
          <CardContent className='GameControllerCardContentArea'>
            <div className='GameControllerButtonContainer'>
              <div className='GameControllerButton'>
                <IconButton color='primary' onClick={() => finishGame(game.id)}>
                  <VisibilityIcon fontSize='large' color='error' />
                </IconButton>
              </div>
              <Typography variant='caption'>Reveal</Typography>
            </div>
            <div className='GameControllerButtonContainer'>
              <div className='GameControllerButton'>
                <IconButton onClick={() => resetGame(game.id)}>
                  <RefreshIcon fontSize='large' color='primary' />
                </IconButton>
              </div>
              <Typography variant='caption'>Restart</Typography>
            </div>
            <div className='GameControllerButtonContainer'>
              <div className='GameControllerButton'>
                <IconButton onClick={() => joinGame()}>
                  <PersonAdd fontSize='large' style={{ color: green[500] }} />
                </IconButton>
              </div>
              <Typography variant='caption'>Join</Typography>
            </div>
            <div
              title='Copy invite link'
              className='GameControllerButtonContainer'
            >
              <div className='GameControllerButton'>
                <IconButton onClick={() => copyInviteLink()}>
                  <LinkIcon fontSize='large' style={{ color: blue[500] }} />
                </IconButton>
              </div>
              <Typography variant='caption'>Invite</Typography>
            </div>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          open={showCopiedMessage}
          autoHideDuration={5000}
          onClose={() => setShowCopiedMessage(false)}
        >
          <Alert severity='success'>Invite Link copied to clipboard!</Alert>
        </Snackbar>
      </div>
    </Grow>
  );
};
