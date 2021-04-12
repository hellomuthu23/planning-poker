import { Slide, Typography } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import { RecentGames } from '../../components/Poker/RecentGames/RecentGames';
import './HomePage.css';

export const HomePage = () => {
  const isJoin = useRouteMatch('/join');
  return (
    <div className='HomePage'>
      <div className='HomePageMainContent'>
        <Slide direction='right' in={true} timeout={1000}>
          <div className='HomePageLeft'></div>
        </Slide>

        <div className='HomePageRight'>
          {isJoin ? <JoinGame /> : <CreateGame />}
        </div>
      </div>
      <div>
        <div className='HomePageInfoSection'>
          <Slide in={true} direction='up' timeout={2000}>
            <div>
              <RecentGames />
            </div>
          </Slide>
        </div>
        <div className='RecentGamesSection'>
          <Slide in={true} direction='up' timeout={2000}>
            <Typography>
              Free Planning Poker App to estimate user stories. Create a session
              and invite your team members to estimate user stories efficiently.
            </Typography>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
