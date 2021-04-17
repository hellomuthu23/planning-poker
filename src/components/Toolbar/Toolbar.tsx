import { Button, Slide } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import AppToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GamesIcon from '@material-ui/icons/Games';
import GithubIcon from '@material-ui/icons/GitHub';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Toolbar.css';
export const title = 'Planning Poker';

export const Toolbar = () => {
  const history = useHistory();
  return (
    <Slide direction='down' in={true} timeout={800}>
      <div>
        <AppBar
          position='relative'
          style={{
            color: 'black',
            background: 'transparent',
            boxShadow: 'none',
            flexGrow: 1,
          }}
        >
          <AppToolbar>
            <div className='HeaderContainer'>
              <div
                className='HeaderLeftContainer'
                onClick={() => history.push('/')}
              >
                <GamesIcon className='HeaderIcon' />
                <Typography variant='h5' color='inherit' noWrap>
                  {title}
                </Typography>
                <Typography variant='caption' color='inherit' noWrap>
                  (beta)
                </Typography>
              </div>
              <div>
                <Button color='inherit' onClick={() => history.push('/')}>
                  New Session
                </Button>
                <Button color='inherit' onClick={() => history.push('/join')}>
                  Join Session
                </Button>
                <Button
                  id='github-button'
                  color='inherit'
                  onClick={() =>
                    (window.location.href =
                      'https://github.com/hellomuthu23/planning-poker')
                  }
                >
                  <GithubIcon></GithubIcon>
                </Button>
              </div>
            </div>
          </AppToolbar>
        </AppBar>
      </div>
    </Slide>
  );
};
