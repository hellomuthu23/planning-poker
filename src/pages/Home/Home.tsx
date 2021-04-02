import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import './Home.css';

export const Home = () => {
  const [showCreateNewGame, setShowCreateNewGame] = useState(false);
  return (
    <>
      <Toolbar />
      <div className='Home'>
        {!showCreateNewGame && (
          <>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setShowCreateNewGame(true)}
            >
              Create New Game
            </Button>
            <Button variant='contained' color='primary'>
              Join a Game
            </Button>
          </>
        )}
        {showCreateNewGame && <CreateGame />}
      </div>
    </>
  );
};

export default Home;
