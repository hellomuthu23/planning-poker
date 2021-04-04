import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addNewGame } from '../../../repository/games';
import { NewGame } from '../../../types/game';
import './CreateGame.css';

export const CreateGame = () => {
  const history = useHistory();
  const [gameName, setGameName] = useState('End Game');
  const [createdBy, setCreatedBy] = useState('SuperHero');
  const handleSubmit = (event: FormEvent) => {
    const game: NewGame = {
      name: gameName,
      createdBy: createdBy,
      createdAt: new Date(),
    };
    console.log(game);
    event.preventDefault();
    const newGameId = addNewGame(game);
    history.push(`/game/${newGameId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className='card'>
        <CardHeader title='Create New Game' />
        <CardContent>
          <TextField
            className='textField'
            required
            id='filled-required'
            label='Game Name'
            defaultValue={gameName}
            variant='outlined'
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setGameName(event.target.value)
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
            Create
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
