import { Divider, Link, Slide, Typography } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <Slide in={true} direction='up' timeout={3000}>
        <div className='FooterSection'>
          <Divider variant='middle'></Divider>
          <div className='FooterContainer'>
            <div className='FooterItemContainer'>
              <CopyrightIcon color='secondary' fontSize='small' />
              <Typography color='textSecondary' variant='body2'>
                hellomuthu23
              </Typography>
            </div>

            <Divider orientation='vertical' flexItem></Divider>
            <div className='FooterItemContainer'>
              <Typography color='textSecondary' variant='body2'>
                Feedback: hellomuthu23@gmail.com
              </Typography>
            </div>

            <Divider orientation='vertical' flexItem></Divider>
            <Link href='https://github.com/hellomuthu23/planning-poker/issues'>Submit an Issue</Link>
            <Divider orientation='vertical' flexItem></Divider>
            <div className='FooterItemContainer'>
              <Typography color='textSecondary' variant='body2'>
                <a href='https://www.buymeacoffee.com/hellomuthu23' target='_blank' rel='noreferrer'>
                  <img
                    src='https://cdn.buymeacoffee.com/buttons/v2/default-blue.png'
                    alt='Buy Me A Coffee'
                    style={{ height: '40px', width: '150px' }}
                  />
                </a>
              </Typography>
            </div>
          </div>
        </div>
      </Slide>
    </footer>
  );
};
