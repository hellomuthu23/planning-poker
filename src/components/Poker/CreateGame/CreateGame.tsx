import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grow,
  TextField,
} from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addNewGame } from '../../../service/games';
import { NewGame } from '../../../types/game';
import './CreateGame.css';

export const CreateGame = () => {
  const history = useHistory();
  const [gameName, setGameName] = useState('Avengers');
  const [createdBy, setCreatedBy] = useState('SuperHero');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const game: NewGame = {
      name: gameName,
      createdBy: createdBy,
      createdAt: new Date(),
    };
    const newGameId = await addNewGame(game);
    history.push(`/game/${newGameId}`);
  };

  return (
    <Grow in={true} timeout={1000}>
      <form onSubmit={handleSubmit}>
        <Card variant='outlined' className='CreateGameCard'>
          <CardHeader
            className='CreateGameCardHeader'
            title='Create New Session'
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent className='CreateGameCardContent'>
            <TextField
              className='CreateGameTextField'
              required
              id='filled-required'
              label='Session Name'
              defaultValue={gameName}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setGameName(event.target.value)
              }
            />
            <TextField
              className='CreateGameTextField'
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
          <CardActions className='CreateGameCardAction'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='CreateGameButton'
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </Grow>
  );
};
