import { Button, Slide, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import AppToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GamesIcon from '@mui/icons-material/Games';
import GithubIcon from '@mui/icons-material/GitHub';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MergeTypeOutlinedIcon from '@mui/icons-material/MergeTypeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import React from 'react';
import { useNavigate } from 'react-router';
import './Toolbar.css';
import { useTranslation } from 'react-i18next';
export const title = 'Planning Poker';

export const Toolbar = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('xs'));
  const { t } = useTranslation();

  return (
    <Slide direction='down' in={true} timeout={800}>
      <AppBar position='sticky' className='AppBar'>
        <AppToolbar>
          <div className='HeaderContainer'>
            <div className='HeaderLeftContainer' onClick={() => navigate('/')}>
              <GamesIcon className='HeaderIcon' />
              <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'}
                          color='inherit'
                          noWrap
                          title={`Version: ${import.meta.env.PACKAGE_VERSION}`}>
                {title}
              </Typography>
            </div>
            <div>
              <Button
                title={t('toolbar.menu.about')}
                startIcon={<InfoOutlinedIcon />}
                color='inherit'
                onClick={() => navigate('/about-planning-poker')}
              >
                {!isSmallScreen ? t('toolbar.menu.about') : null}
              </Button>
              <Button
                title={t('toolbar.menu.guide')}
                startIcon={<SearchOutlinedIcon />}
                color='inherit'
                onClick={() => navigate('/guide')}
              >
                {!isSmallScreen ? t('toolbar.menu.guide') : null}
              </Button>
              <Button
                title={t('toolbar.menu.examples')}
                startIcon={<BookOutlinedIcon />}
                color='inherit'
                onClick={() => navigate('/examples')}
              >
                {!isSmallScreen ? t('toolbar.menu.examples') : null}
              </Button>
              <Button
                title={t('toolbar.menu.newSession')}
                startIcon={<AddCircleOutlineIcon />}
                color='inherit'
                onClick={() => navigate('/')}
                data-testid='toolbar.menu.newSession'
              >
                {!isSmallScreen ? t('toolbar.menu.newSession') : null}
              </Button>
              <Button
                title={t('toolbar.menu.joinSession')}
                startIcon={<MergeTypeOutlinedIcon />}
                size={isSmallScreen ? 'small' : 'large'}
                color='inherit'
                onClick={() => navigate('/join')}
                data-testid='toolbar.menu.joinSession'
              >
                {!isSmallScreen ? t('toolbar.menu.joinSession') : null}
              </Button>
              <Button
                title={t('toolbar.menu.legalNotice')}
                startIcon={<PolicyOutlinedIcon />}
                size={isSmallScreen ? 'small' : 'large'}
                color='inherit'
                onClick={() =>
                  (window.location.href = 'https://info.foerther.de/legal_notice_en.html')
                }
                data-testid='toolbar.menu.legal'
              >
                {!isSmallScreen ? t('toolbar.menu.legalNotice') : null}
              </Button>

              <Button
                id='github-button'
                color='inherit'
                onClick={() =>
                  (window.location.href = 'https://github.com/rfoerthe/planning-poker')
                }
              >
                <GithubIcon></GithubIcon>
              </Button>
              {/*{!isSmallScreen && <LanguageControl />}*/}
            </div>
          </div>
        </AppToolbar>
      </AppBar>
    </Slide>
  );
};
