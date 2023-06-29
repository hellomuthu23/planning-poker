import { Button, Slide, useMediaQuery } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import AppToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GamesIcon from '@material-ui/icons/Games';
import GithubIcon from '@material-ui/icons/GitHub';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MergeTypeOutlinedIcon from '@material-ui/icons/MergeTypeOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import BookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Toolbar.css';
export const title = 'Planning Poker';

export const Toolbar = () => {
  const history = useHistory();
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('xs'));

  return (
    <Slide direction='down' in={true} timeout={800}>
      <AppBar position='sticky' className='AppBar'>
        <AppToolbar>
          <div className='HeaderContainer'>
            <div className='HeaderLeftContainer' onClick={() => history.push('/')}>
              <GamesIcon className='HeaderIcon' />
              <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} color='inherit' noWrap>
                {title}
              </Typography>
            </div>
            <div>
              <Button
                title='About section'
                startIcon={<InfoOutlinedIcon />}
                color='inherit'
                onClick={() => history.push('/about-planning-poker')}
              >
                {!isSmallScreen ? 'What is planning poker?' : null}
              </Button>
              <Button
                title='Guide'
                startIcon={<SearchOutlinedIcon />}
                color='inherit'
                onClick={() => history.push('/guide')}
              >
                {!isSmallScreen ? 'Guide' : null}
              </Button>
              <Button
                title='Example'
                startIcon={<BookOutlinedIcon />}
                color='inherit'
                onClick={() => history.push('/examples')}
              >
                {!isSmallScreen ? 'Examples' : null}
              </Button>
              <Button
                title='New Session'
                startIcon={<AddCircleOutlineIcon />}
                color='inherit'
                onClick={() => history.push('/')}
              >
                {!isSmallScreen ? 'New Session' : null}
              </Button>
              <Button
                startIcon={<MergeTypeOutlinedIcon />}
                size={isSmallScreen ? 'small' : 'large'}
                color='inherit'
                onClick={() => history.push('/join')}
              >
                {!isSmallScreen ? 'Join Session' : null}
              </Button>
              <Button
                id='github-button'
                color='inherit'
                onClick={() => (window.location.href = 'https://github.com/hellomuthu23/planning-poker')}
              >
                <GithubIcon></GithubIcon>
              </Button>
            </div>
          </div>
        </AppToolbar>
      </AppBar>
    </Slide>
  );
};
