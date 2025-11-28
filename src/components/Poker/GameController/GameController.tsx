import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  Grow,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import { blue, green, grey, orange } from '@mui/material/colors';
import RefreshIcon from '@mui/icons-material/Autorenew';
import ExitToApp from '@mui/icons-material/ExitToApp';
import LinkIcon from '@mui/icons-material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertDialog } from '../../AlertDialog/AlertDialog';
import { InfoDialog } from '../../InfoDialog/InfoDialog';
import { finishGame, removeGame, resetGame } from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import { isModerator } from '../../../utils/isModerator';
import './GameController.css';
import { Clear } from '@mui/icons-material';

interface GameControllerProps {
  game: Game;
  currentPlayerId: string;
}

export const GameController: React.FC<GameControllerProps> = ({ game, currentPlayerId }) => {
  const navigate = useNavigate();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showGameProtected, setShowGameProtected] = useState(false);
  const copyInviteLink = async () => {
    const url = `${window.location.origin}/join/${game.id}`;

    try {
      await navigator.clipboard.writeText(url);
      setShowCopiedMessage(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    return url;
  };

  const leaveGame = () => {
    navigate(`/`);
  };

  const handleRemoveGame = async (recentGameId: string) => {
    await removeGame(recentGameId);
    window.location.href = '/';
  };

  return (
    <>
      <Grow in={true} timeout={2000}>
        <div className='GameController'>
          <Card variant='outlined' className='GameControllerCard'>
            <CardHeader
              title={game.name}
              slotProps={{ title: { variant: 'h6' } }}
              action={
                <div
                  className={
                    'GameControllerCardHeaderAverageContainer ' +
                    getGameStatusBackGroundClass(game.gameStatus)
                  }
                >
                  <Typography variant='subtitle1'>
                    {game.gameStatus} {getGameStatusIcon(game.gameStatus)}
                  </Typography>
                  {game.gameType !== GameType.TShirt &&
                    game.gameType !== GameType.TShirtAndNumber &&
                    game.gameType !== GameType.Custom && (
                      <>
                        <Divider
                          className='GameControllerDivider'
                          orientation='vertical'
                          flexItem
                        />
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
                      <IconButton
                        style={{ padding: '3px', background: 'white' }}
                        title={'Deleting the game is not allowed'}
                      >
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
                      <IconButton
                        style={{ padding: '3px', background: 'white' }}
                        title={'Remove game session'}
                      >
                        <Clear fontSize='small' style={{ color: grey[900] }} />
                      </IconButton>
                    </AlertDialog>
                  )}
                </div>
              }
              className='GameControllerCardTitle'
            ></CardHeader>
            <CardContent className='GameControllerCardContentArea'>
              {isModerator(
                game.createdById,
                currentPlayerId,
                game.isAllowMembersToManageSession,
              ) && (
                <>
                  <div className='GameControllerButtonContainer'>
                    <div className='GameControllerButton'>
                      <IconButton
                        onClick={() => finishGame(game.id)}
                        title={'Finish game by revealing cards'}
                        data-testid='reveal-button'
                        color='primary'
                        disabled={game.gameStatus === 'Finished' || game.gameStatus === 'Started'}
                      >
                        <VisibilityIcon fontSize='large' style={{ color: green[500] }} />
                      </IconButton>
                    </div>
                    <Typography variant='caption'>Reveal</Typography>
                  </div>

                  <div className='GameControllerButtonContainer'>
                    <div className='GameControllerButton'>
                      <IconButton
                        data-testid='restart-button'
                        onClick={() => resetGame(game.id)}
                        title={'Start a new game'}
                        disabled={game.gameStatus === 'Started'}
                      >
                        <RefreshIcon fontSize='large' color='error' />
                      </IconButton>
                    </div>
                    <Typography variant='caption'>Restart</Typography>
                  </div>
                </>
              )}
              <div className='GameControllerButtonContainer'>
                <div className='GameControllerButton'>
                  <IconButton
                    data-testid='exit-button'
                    onClick={() => leaveGame()}
                    title={'Leave game'}
                  >
                    <ExitToApp fontSize='large' style={{ color: orange[500] }} />
                  </IconButton>
                </div>
                <Typography variant='caption'>Exit</Typography>
              </div>
              <div title='Copy invite link to clipboard' className='GameControllerButtonContainer'>
                <div className='GameControllerButton'>
                  <InfoDialog
                    title='Invite link has been created'
                    onOpen={(): React.ReactNode => (
                      <span>
                        Invite link <b>{copyInviteLink()}</b> was copied to your clipboard.
                        <br />
                        <br />
                        Share it with your friends to invite them to this session.
                      </span>
                    )}
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
        </div>
      </Grow>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={showCopiedMessage}
        autoHideDuration={5000}
        slotProps={{ transition: Fade }}
        transitionDuration={1000}
        onClose={() => setShowCopiedMessage(false)}
      >
        <Alert severity='success'>Invite Link copied to clipboard!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={showGameProtected}
        autoHideDuration={5000}
        slotProps={{ transition: Fade }}
        transitionDuration={1000}
        onClose={() => setShowGameProtected(false)}
      >
        <Alert severity='error'>Deleting the game is not allowed!</Alert>
      </Snackbar>
    </>
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
