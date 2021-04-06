import React from 'react';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import './HomePage.css';

export const HomePage = () => {
  return (
    <div className='Home'>
      <CreateGame />
      <JoinGame />
    </div>
  );
};

export default HomePage;
