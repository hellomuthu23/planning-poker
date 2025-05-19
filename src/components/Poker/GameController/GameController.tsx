import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grow,
  IconButton,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { blue, green, grey, orange} from '@material-ui/core/colors';
import RefreshIcon from '@material-ui/icons/Autorenew';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LinkIcon from '@material-ui/icons/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AlertDialog } from '../../AlertDialog/AlertDialog';
import { InfoDialog } from '../../InfoDialog/InfoDialog';
import { finishGame, removeGame, resetGame } from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import { isModerator } from '../../../utils/isModerator';
import './GameController.css';
import { Clear } from '@material-ui/icons';

interface GameControllerProps {
  game: Game;
  currentPlayerId: string;
}

export const GameController: React.FC<GameControllerProps> = ({ game, currentPlayerId }) => {
  const history = useHistory();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showGameProtected, setShowGameProtected] = useState(false);
  const copyInviteLink = () => {
    const dummy = document.createElement('input');
    const url = `${window.location.origin}/join/${game.id}`;
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    setShowCopiedMessage(true);
    return url;
  };

  const leaveGame = () => {
    history.push(`/`);
  };

  const handleRemoveGame = async (recentGameId: string) => {
    await removeGame(recentGameId);
    window.location.href = '/';
  };

  return (
    <Grow in={true} timeout={2000}>
      <div className='GameController'>
        <Card variant='outlined' className='GameControllerCard'>
          <CardHeader
            title={game.name}
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <div className={'GameControllerCardHeaderAverageContainer ' + getGameStatusBackGroundClass(game.gameStatus)}>
                <Typography variant='subtitle1'>
                  {game.gameStatus} {getGameStatusIcon(game.gameStatus)}
                </Typography>
                {game.gameType !== GameType.TShirt &&
                  game.gameType !== GameType.TShirtAndNumber &&
                  game.gameType !== GameType.Custom && (
                    <>
                      <Divider className='GameControllerDivider' orientation='vertical' flexItem />
                      <Typography variant='subtitle1'>Average:</Typography>
                      <Typography
                        variant='subtitle1'
                        className='GameControllerCardHeaderAverageValue'
                      >
                        {game.average || 0}
                      </Typography>
                    </>
                  )}
                <Divider className='GameControllerDivider' orientation='vertical' flexItem />
                {game.isLocked ? (
                  <div onClick={() => setShowGameProtected(true)}>
                  <IconButton style={{ padding: '3px', background:'white'}} title={"The game is protected against deletion"}>
                    <Clear fontSize='small' style={{ color: grey[300] }} />
                  </IconButton>
                  </div>
                  ) : (
                  <AlertDialog
                    title='Remove this session'
                    message={`Are you sure? This will delete this session and remove all players.`}
                    onConfirm={() => handleRemoveGame(game.id)}
                    data-testid='delete-button-dialog'
                  >
                    <IconButton style={{ padding: '3px', background:'white'}} title={"Remove game session"}>
                      <Clear fontSize='small' style={{ color: grey[900] }} />
                    </IconButton>
                  </AlertDialog>
                  )}
              </div>
            }
            className='GameControllerCardTitle'
          ></CardHeader>
          <CardContent className='GameControllerCardContentArea'>
            {isModerator(game.createdById, currentPlayerId, game.isAllowMembersToManageSession) && (
              <>
                <div className='GameControllerButtonContainer'>
                  <div className='GameControllerButton'>
                    <IconButton
                      onClick={() => finishGame(game.id)}
                      title={'Finish game by revealing cards'}
                      data-testid='reveal-button'
                      color='primary'
                    >
                      <VisibilityIcon fontSize='large' style={{ color: green[500] }} />
                    </IconButton>
                  </div>
                  <Typography variant='caption'>Reveal</Typography>
                </div>

                <div className='GameControllerButtonContainer'>
                  <div className='GameControllerButton'>
                    <IconButton data-testid='restart-button' onClick={() => resetGame(game.id)} title={'Start a new game'}>
                      <RefreshIcon fontSize='large' color='error' />
                    </IconButton>
                  </div>
                  <Typography variant='caption'>Restart</Typography>
                </div>

              </>
            )}
            <div className='GameControllerButtonContainer'>
              <div className='GameControllerButton'>
                <IconButton data-testid='exit-button' onClick={() => leaveGame()} title={'Leave game'}>
                  <ExitToApp fontSize='large' style={{ color: orange[500] }} />
                </IconButton>
              </div>
              <Typography variant='caption'>Exit</Typography>
            </div>
            <div title='Copy invite link to clipboard' className='GameControllerButtonContainer'>
              <div className='GameControllerButton'>
                <InfoDialog
                  title='Invite link has been created'
                  onOpen={(): React.ReactNode => (<span>Invite link <b>{copyInviteLink()}</b> was copied to your clipboard.<br/><br/>
                    Share it with your friends to invite them to this session.</span>)}
                  data-testid='invite-button-dialog'
                >
                  <IconButton data-testid='invite-button'>
                    <LinkIcon fontSize='large' style={{ color: blue[500] }} />
                  </IconButton>
                </InfoDialog>
              </div>
              <Typography variant='caption'>Invite</Typography>
            </div>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          open={showCopiedMessage}
          autoHideDuration={5000}
          onClose={() => setShowCopiedMessage(false)}
        >
          <Alert severity='success'>Invite Link copied to clipboard!</Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          open={showGameProtected}
          autoHideDuration={5000}
          onClose={() => setShowGameProtected(false)}
        >
          <Alert severity='error'>The game is protected against deletion!</Alert>
        </Snackbar>

      </div>
    </Grow>
  );
};

const getGameStatusIcon = (gameStatus: string) => {
  switch (gameStatus) {
    case 'In Progress':
      return '⏱️';
    case 'Finished':
      return '🎉';
    default:
      return '🚀';
  }
};

const getGameStatusBackGroundClass = (gameStatus: string) => {
  switch (gameStatus) {
    case 'In Progress':
      return 'InProgress';
    case 'Finished':
      return 'Finished';
    default:
      return 'Started';
  }
};
