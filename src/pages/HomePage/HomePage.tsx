import { Box, Divider, Slide, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useMatch } from 'react-router';
import { useTranslation } from 'react-i18next';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import { RecentGames } from '../../components/Poker/RecentGames/RecentGames';
import LandingImage from './../../images/background.jpg';
import SessionControllerImage from './../../images/Session.jpg';
import './HomePage.css';
import { AboutPlanningPokerContent } from '../AboutPage/AboutPage';
import { Footer } from '../../components/Footer/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const HomePage = () => {
  const isJoin = useMatch('/join');
  const { t } = useTranslation();

  return (
    <>
      <Grid container direction='column' justifyContent='center' alignItems='center'>
        <Grid container size={{ xs: 12, sm: 12, lg: 11 }} justifyContent='center' alignItems='center'>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <Slide direction='down' in={true} timeout={1000}>
              <div className='HomePageContainer'>
                <Typography variant='h5'>{t('HomePage.heroSection.title')}</Typography>
                <Box padding={2}>
                  <LazyLoadImage
                    loading='lazy'
                    alt={t('HomePage.heroSection.title')}
                    className='HomePageImage'
                    src={LandingImage}
                  ></LazyLoadImage>
                </Box>
                <Typography variant='subtitle1'>{t('HomePage.heroSection.description')}</Typography>
              </div>
            </Slide>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <div className='HomePageContainer'>{isJoin ? <JoinGame /> : <CreateGame />}</div>
          </Grid>
        </Grid>
        <Grid container size={{ xs: 12, sm: 12, lg: 9 }} justifyContent='center' alignItems='center'>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <Slide in={true} direction='up' timeout={1000}>
              <Divider variant='middle'></Divider>
            </Slide>
          </Grid>
        </Grid>
        <Grid container size={{ xs: 12, sm: 12, lg: 9 }} justifyContent='center' alignItems='center'>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <Slide in={true} direction='up' timeout={1000}>
              <div className='HomePageContainer'>
                <RecentGames />
              </div>
            </Slide>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <Slide in={true} direction='up' timeout={1000}>
              <div className='HomePageContainer'>
                <Typography variant='subtitle1'>
                  Here is your recent Planning/Refinement sessions, click on the session name to
                  join the session again.
                </Typography>
              </div>
            </Slide>
          </Grid>
        </Grid>
        <Grid container size={{ xs: 12, sm: 12, lg: 9 }} justifyContent='center' alignItems='center'>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <Slide in={true} direction='up' timeout={1500}>
              <Divider variant='middle'></Divider>
            </Slide>
          </Grid>
        </Grid>
        <Grid container size={{ xs: 12, sm: 12, lg: 9 }} justifyContent='center' alignItems='center'>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <Slide in={true} direction='up' timeout={1500}>
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
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <Slide in={true} direction='up' timeout={1500}>
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
        <AboutPlanningPokerContent />
      </Grid>
      <Footer />
    </>
  );
};

export default HomePage;
