import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { addNewGame } from '../../../repository/games';
import { NewGame } from '../../../types/game';
import './JoinGame.css';

export const JoinGame = () => {
  const [isGameCreated, setIsGameCreated] = useState(false);
  const [gameId, setGameId] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [newGameId, setNewGameId] = useState('');
  const handleSubmit = (event: FormEvent) => {
    const game: NewGame = {
      name: gameId,
      createdBy: createdBy,
      createdAt: new Date(),
    };
    console.log(game);
    event.preventDefault();
    setNewGameId(addNewGame(game));
    setIsGameCreated(true);
  };

  return (
    <>
      {!isGameCreated && (
        <form onSubmit={handleSubmit}>
          <Card className='card'>
            <CardHeader title='Join a Game' />
            <CardContent>
              <TextField
                className='textField'
                required
                id='filled-required'
                label='Game ID'
                placeholder='xyz...'
                defaultValue={gameId}
                variant='outlined'
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setGameId(event.target.value)
                }
              />
              <TextField
                className='textField'
                required
                id='filled-required'
                label='Your Name'
                defaultValue={createdBy}
                variant='outlined'
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCreatedBy(event.target.value)
                }
              />
            </CardContent>
            <CardActions>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className='button'
              >
                Join
              </Button>
            </CardActions>
          </Card>
        </form>
      )}
    </>
  );
};
