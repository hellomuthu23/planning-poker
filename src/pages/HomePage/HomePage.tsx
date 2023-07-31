import { Divider, Grid, Slide, Typography, Box } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import { RecentGames } from '../../components/Poker/RecentGames/RecentGames';
import LandingImage from './../../images/background.jpg';
import SessionControllerImage from './../../images/Session.jpg';
import './HomePage.css';
import { AboutPlanningPokerContent } from '../AboutPage/AboutPage';
import { Footer } from '../../components/Footer/Footer';
import { GoogleAd } from '../../components/GoogleAd/GoogleAd';

export const HomePage = () => {
  const isJoin = useRouteMatch('/join');
  const { t } = useTranslation();

  return (
    <>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid container item sm={12} lg={11} justify='center' alignItems='center'>
          <Grid item sm={12} lg={6}>
            <Slide direction='down' in={true} timeout={1000}>
              <div className='HomePageContainer'>
                <Typography variant='h5'>{t('HomePage.heroSection.title')}</Typography>
                <Box padding={2}>
                  <img
                    alt={t('HomePage.heroSection.title')}
                    className='HomePageImage'
                    src={LandingImage}
                  ></img>
                </Box>
                <Typography variant='subtitle1'>{t('HomePage.heroSection.description')}</Typography>
              </div>
            </Slide>
          </Grid>
          <Grid item sm={12} lg={6}>
            <div className='HomePageContainer'>{isJoin ? <JoinGame /> : <CreateGame />}</div>
          </Grid>
        </Grid>
        <GoogleAd />
        <Grid container item sm={12} lg={9} justify='center' alignItems='center'>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1000}>
              <Divider variant='middle'></Divider>
            </Slide>
          </Grid>
        </Grid>
        <Grid container item sm={12} lg={9} justify='center' alignItems='center'>
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
                  Here is your recent Planning/Refinement sessions, click on the session name to
                  join the session again.
                </Typography>
              </div>
            </Slide>
          </Grid>
        </Grid>
        <Grid container item sm={12} lg={9} justify='center' alignItems='center'>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={2000}>
              <Divider variant='middle'></Divider>
            </Slide>
          </Grid>
        </Grid>
        <Grid container item sm={12} lg={9} justify='center' alignItems='center'>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={2000}>
              <div className='HomePageContainer'>
                <Typography variant='h5'> Intuitive UI Design</Typography>
                <Typography variant='subtitle1'>
                  Beautiful design for voting the story points, showing team members voting status
                  with emojis(👍 - Voting Done, 🤔 - Yet to Vote). Once the card values are
                  revealed, the card color helps to understand if the team's voting is sync or not.
                  Session Moderator has full control on revealing story points and restarting the
                  session.
                </Typography>
              </div>
            </Slide>
          </Grid>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={2000}>
              <div className='HomePageContainer'>
                <Box padding={2}>
                  <img
                    className='SessionImage'
                    alt='Session controller'
                    src={SessionControllerImage}
                  ></img>
                </Box>
              </div>
            </Slide>
          </Grid>
        </Grid>
        <GoogleAd />
        <AboutPlanningPokerContent />
        <GoogleAd />
      </Grid>

      <Footer />
    </>
  );
};

export default HomePage;
