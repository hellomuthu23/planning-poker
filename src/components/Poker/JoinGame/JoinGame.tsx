import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fade,
  Grow,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getGame } from '../../../service/games';
import {
  addPlayerToGame,
  isCurrentPlayerInGame,
  removeGameFromCache,
} from '../../../service/players';
import Alert from '@mui/material/Alert';
import './JoinGame.css';

export const JoinGame = () => {
  const navigate = useNavigate();
  let { id } = useParams<{ id: string }>();

  const [joinGameId, setJoinGameId] = useState(id);
  const [playerName, setPlayerName] = useState('');
  const [gameFound, setIsGameFound] = useState(true);
  const [showNotExistMessage, setShowNotExistMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (joinGameId) {
        if (await getGame(joinGameId)) {
          setIsGameFound(true);
          if (await isCurrentPlayerInGame(joinGameId)) {
            navigate(`/game/${joinGameId}`);
          }
        } else {
          removeGameFromCache(joinGameId);
          setShowNotExistMessage(true);
          setTimeout(() => {
            navigate('/');
          }, 5000);
        }
      }
    }
    fetchData();
  }, [joinGameId, history]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (joinGameId) {
      const res = await addPlayerToGame(joinGameId, playerName);

      setIsGameFound(res);
      setLoading(false);
      if (res) {
        navigate(`/game/${joinGameId}`);
      }
    }
  };

  return (
    <>
      <Grow in={true} timeout={500}>
        <div>
          <form onSubmit={handleSubmit}>
            <Card variant='outlined' className='JoinGameCard'>
              <CardHeader
                className='JoinGameCardHeader'
                title='Join a Session'
                slotProps={{ title: { variant: 'h4' } }}
              />
              <CardContent className='JoinGameCardContent'>
                <TextField
                  error={!gameFound}
                  helperText={!gameFound && 'Session not found, check the ID'}
                  className='JoinGameTextField'
                  required
                  id='sessionIdRequired'
                  label='Session ID'
                  placeholder='xyz...'
                  defaultValue={joinGameId}
                  variant='outlined'
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setJoinGameId(event.target.value)
                  }
                />
                <TextField
                  className='JoinGameTextField'
                  required
                  id='playerNameRequired'
                  label='Your Name'
                  placeholder='Enter your name'
                  defaultValue={playerName}
                  variant='outlined'
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setPlayerName(event.target.value)
                  }
                />
              </CardContent>
              <CardActions className='JoinGameCardAction'>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className='JoinGameButton'
                  disabled={loading}
                >
                  Join
                </Button>
              </CardActions>
            </Card>
          </form>
        </div>
      </Grow>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={showNotExistMessage}
        autoHideDuration={5000}
        slotProps={{ transition: Fade }}
        transitionDuration={1000}
        onClose={() => setShowNotExistMessage(false)}
      >
        <Alert severity='error'>Session was deleted and doesn't exist anymore!</Alert>
      </Snackbar>
    </>
  );
};
