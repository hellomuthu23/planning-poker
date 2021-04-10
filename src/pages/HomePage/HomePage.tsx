import { Typography } from '@material-ui/core';
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
      <div className='HomePageMainContent'>
        <div className='HomePageLeft'></div>
        <div className='HomePageRight'>
          {isJoin ? <JoinGame /> : <CreateGame />}
        </div>
      </div>
      <div className='HomePageInfoSection'>
        <Typography variant='h6'>
          Free Planning Poker App to estimate user stories. Create a session and
          invite your team members to estimate user stories efficiently.
        </Typography>
      </div>
    </div>
  );
};

export default HomePage;
