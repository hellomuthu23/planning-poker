import { Divider, Link, Slide, Typography } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <Slide in={true} direction='up' timeout={1000}>
        <div>
          <Divider variant='middle'></Divider>
          <div className='FooterContainer'>
            <div className='FooterItemContainer'>
              <CopyrightIcon />
              <Typography variant='body2'>hellomuthu23</Typography>
            </div>

            <Divider orientation='vertical' flexItem></Divider>
            <div className='FooterItemContainer'>
              <EmailIcon />
              <Typography variant='body2'>
                Feedback: hellomuthu23@gmail.com
              </Typography>
            </div>

            <Divider orientation='vertical' flexItem></Divider>
            <Link href='https://github.com/hellomuthu23/planning-poker/issues'>
              Submit an Issue
            </Link>
          </div>
        </div>
      </Slide>
    </footer>
  );
};
