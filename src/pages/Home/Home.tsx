import React from 'react';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import './Home.css';

export const Home = () => {
  return (
    <>
      <Toolbar />
      <div className='Home'>
        <CreateGame />
        <JoinGame />
      </div>
    </>
  );
};

export default Home;
