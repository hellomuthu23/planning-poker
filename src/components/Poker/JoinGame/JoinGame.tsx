import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grow,
  TextField,
} from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getGame } from '../../../service/games';
import {
  addPlayerToGame,
  isCurrentPlayerInGame,
} from '../../../service/players';
import './JoinGame.css';

export const JoinGame = () => {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();

  const [joinGameId, setJoinGameId] = useState(id);
  const [playerName, setPlayerName] = useState('');
  const [gameFound, setIsGameFound] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (joinGameId) {
        if (await getGame(joinGameId)) {
          setIsGameFound(true);
          if (isCurrentPlayerInGame(joinGameId)) {
            history.push(`/game/${joinGameId}`);
          }
        }
      }
    }
    fetchData();
  }, [joinGameId, history]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (joinGameId) {
      const res = await addPlayerToGame(joinGameId, playerName);

      setIsGameFound(res);
      if (res) {
        history.push(`/game/${joinGameId}`);
      }
    }
  };

  return (
    <Grow in={true} timeout={500}>
      <div>
        <form onSubmit={handleSubmit}>
          <Card variant='outlined' className='JoinGameCard'>
            <CardHeader
              className='JoinGameCardHeader'
              title='Join a Session'
              titleTypographyProps={{ variant: 'h4' }}
            />
            <CardContent className='JoinGameCardContent'>
              <TextField
                error={!gameFound}
                helperText={!gameFound && 'Session not found, check the ID'}
                className='JoinGameTextField'
                required
                id='filled-required'
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
                id='filled-required'
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
              >
                Join
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </Grow>
  );
};
