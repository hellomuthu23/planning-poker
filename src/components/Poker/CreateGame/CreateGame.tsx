import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ulid } from 'ulid';

import {
  Card,
  CardContent,
  TextField,
  CardActions,
  CardHeader,
  Typography,
  Link,
} from '@material-ui/core';

import './CreateGame.css';
import Button from '@material-ui/core/Button';

interface NewGame {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
}
export const CreateGame = () => {
  const [isGameCreated, setIsGameCreated] = useState(false);
  const [newGame, setNewGame] = useState<NewGame | undefined>(undefined);
  const [gameName, setGameName] = useState('End Game');
  const [createdBy, setCreatedBy] = useState('SuperHero');
  const handleSubmit = (event: FormEvent) => {
    console.log(event);
    const game: NewGame = {
      id: ulid(),
      name: gameName,
      createdBy: createdBy,
      createdAt: new Date(),
    };
    console.log(game);
    event.preventDefault();
    setNewGame(game);
    setIsGameCreated(true);
  };

  return (
    <>
      {!isGameCreated && (
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
      )}
      {isGameCreated && (
        <>
          <Typography color='textPrimary'>
            New Game Created Successfully!
          </Typography>
          <Typography color='textPrimary'>Game Invite Link</Typography>
          <Typography color='primary'>
            <Link href='#'>
              {window.location.href}
              {newGame?.id}
            </Link>
          </Typography>
          <Button variant='contained' color='primary'>
            Goto Game
          </Button>
        </>
      )}
    </>
  );
};
