import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import './HomePage.css';

export const HomePage = () => {
  const isJoin = useRouteMatch('/join');
  console.log(isJoin);
  return (
    <div className='HomePage'>
      <div className='HomePageLeft'></div>
      {isJoin ? <JoinGame /> : <CreateGame />}

    </div>
  );
};

export default HomePage;
