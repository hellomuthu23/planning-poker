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
import { useTranslation } from 'react-i18next';
import { LanguageControl } from '../LanguageControl/LanguageControl';
export const title = 'Planning Poker';

export const Toolbar = () => {
  const history = useHistory();
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('xs'));
  const { t } = useTranslation();

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
                title={t('toolbar.menu.about')}
                startIcon={<InfoOutlinedIcon />}
                color='inherit'
                onClick={() => history.push('/about-planning-poker')}
              >
                {!isSmallScreen ? t('toolbar.menu.about') : null}
              </Button>
              <Button
                title={t('toolbar.menu.guide')}
                startIcon={<SearchOutlinedIcon />}
                color='inherit'
                onClick={() => history.push('/guide')}
              >
                {!isSmallScreen ? t('toolbar.menu.guide') : null}
              </Button>
              <Button
                title={t('toolbar.menu.examples')}
                startIcon={<BookOutlinedIcon />}
                color='inherit'
                onClick={() => history.push('/examples')}
              >
                {!isSmallScreen ? t('toolbar.menu.examples') : null}
              </Button>
              <Button
                title={t('toolbar.menu.newSession')}
                startIcon={<AddCircleOutlineIcon />}
                color='inherit'
                onClick={() => history.push('/')}
                data-testid='toolbar.menu.newSession'
              >
                {!isSmallScreen ? t('toolbar.menu.newSession') : null}
              </Button>
              <Button
                title={t('toolbar.menu.joinSession')}
                startIcon={<MergeTypeOutlinedIcon />}
                size={isSmallScreen ? 'small' : 'large'}
                color='inherit'
                onClick={() => history.push('/join')}
                data-testid='toolbar.menu.joinSession'
              >
                {!isSmallScreen ? t('toolbar.menu.joinSession') : null}
              </Button>

              <Button
                id='github-button'
                color='inherit'
                onClick={() =>
                  (window.location.href = 'https://github.com/hellomuthu23/planning-poker')
                }
              >
                <GithubIcon></GithubIcon>
              </Button>
              {!isSmallScreen && <LanguageControl />}
            </div>
          </div>
        </AppToolbar>
      </AppBar>
    </Slide>
  );
};
