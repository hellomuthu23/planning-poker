import { Card, CardContent, CardHeader, Divider, Grow, IconButton, Snackbar, Typography } from '@material-ui/core';
import { blue, green, orange } from '@material-ui/core/colors';
import RefreshIcon from '@material-ui/icons/Autorenew';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LinkIcon from '@material-ui/icons/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { finishGame, resetGame } from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import './GameController.css';

interface GameControllerProps {
  game: Game;
  currentPlayerId: string;
}

export const GameController: React.FC<GameControllerProps> = ({ game, currentPlayerId }) => {
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

  const leaveGame = () => {
    history.push(`/`);
  };

  const isModerator = (moderatorId: string, currentPlayerId: string) => {
    return moderatorId === currentPlayerId;
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
                <Typography variant='subtitle1'>{game.gameStatus}</Typography>
                {game.gameType !== GameType.TShirt && (
                  <>
                    <Divider className='GameControllerDivider' orientation='vertical' flexItem />
                    <Typography variant='subtitle1'>Average:</Typography>
                    <Typography variant='subtitle1' className='GameControllerCardHeaderAverageValue'>
                      {game.average || 0}
                    </Typography>
                  </>
                )}
              </div>
            }
            className='GameControllerCardTitle'
          ></CardHeader>
          <CardContent className='GameControllerCardContentArea'>
            {isModerator(game.createdById, currentPlayerId) && (
              <>
                <div className='GameControllerButtonContainer'>
                  <div className='GameControllerButton'>
                    <IconButton onClick={() => finishGame(game.id)} data-testid='reveal-button' color='primary'>
                      <VisibilityIcon fontSize='large' style={{ color: green[500] }} />
                    </IconButton>
                  </div>
                  <Typography variant='caption'>Reveal</Typography>
                </div>

                <div className='GameControllerButtonContainer'>
                  <div className='GameControllerButton'>
                    <IconButton data-testid={'restart-button'} onClick={() => resetGame(game.id)}>
                      <RefreshIcon fontSize='large' color='error' />
                    </IconButton>
                  </div>
                  <Typography variant='caption'>Restart</Typography>
                </div>
              </>
            )}
            <div className='GameControllerButtonContainer'>
              <div className='GameControllerButton'>
                <IconButton data-testid='exit-button' onClick={() => leaveGame()}>
                  <ExitToApp fontSize='large' style={{ color: orange[500] }} />
                </IconButton>
              </div>
              <Typography variant='caption'>Exit</Typography>
            </div>
            <div title='Copy invite link' className='GameControllerButtonContainer'>
              <div className='GameControllerButton'>
                <IconButton data-testid='invite-button' onClick={() => copyInviteLink()}>
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
