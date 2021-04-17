import { Divider, Grid, Slide, Typography } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import { RecentGames } from '../../components/Poker/RecentGames/RecentGames';
import LandingImage from './../../images/background.jpg';
import SessionControllerImage from './../../images/Session.jpg';
import './HomePage.css';

export const HomePage = () => {
  const isJoin = useRouteMatch('/join');
  return (
    <>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        spacing={2}
      >
        <Grid
          container
          item
          sm={12}
          lg={9}
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid item sm={12} lg={6}>
            <Slide direction='down' in={true} timeout={1000}>
              <div className='HomePageContainer'>
                <Typography variant='h5'>Free Planning Poker App</Typography>
                <img alt='Free Planning Poker App' src={LandingImage}></img>
                <Typography variant='subtitle1'>
                  Free / Open source Planning Poker Web App to estimate user
                  stories for your Agile/Scrum teams. Create a session and
                  invite your team members to estimate user stories efficiently.
                </Typography>
              </div>
            </Slide>
          </Grid>
          <Grid item sm={12} lg={6}>
            <div className='HomePageContainer'>
              {isJoin ? <JoinGame /> : <CreateGame />}
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          lg={9}
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1000}>
              <Divider variant='middle'></Divider>
            </Slide>
          </Grid>
        </Grid>

        <Grid
          container
          item
          sm={12}
          lg={9}
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1500}>
              <div className='HomePageContainer'>
                <RecentGames />
              </div>
            </Slide>
          </Grid>

          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1500}>
              <div className='HomePageContainer'>
                <Typography variant='subtitle1'>
                  Here is your recent Planning/Refinement sessions, click on the
                  session name to join the session again.
                </Typography>
              </div>
            </Slide>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          lg={9}
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={2000}>
              <Divider variant='middle'></Divider>
            </Slide>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          lg={9}
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={2000}>
              <div className='HomePageContainer'>
                <Typography variant='h5'> Intuitive UI Design</Typography>
                <Typography variant='subtitle1'>
                  Beautiful design for voting the story points, showing team
                  members voting status with emojis(👍 - Voting Done, 🤔 - Yet
                  to Vote). Session Moderator has full control on revealing
                  story points and restarting the session.
                </Typography>
              </div>
            </Slide>
          </Grid>

          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={2000}>
              <div className='HomePageContainer'>
                <img
                  className='SessionImage'
                  alt='Session controller'
                  src={SessionControllerImage}
                ></img>
              </div>
            </Slide>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default HomePage;
