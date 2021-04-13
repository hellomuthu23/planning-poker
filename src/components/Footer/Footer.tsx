import { Button, Divider, Slide, Typography } from '@material-ui/core';
import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <Slide in={true} direction='up' timeout={1000}>
        <div>
          <Divider variant='middle'></Divider>
          <div className='FooterContainer'>
            <Typography>@copyright hellomuthu23</Typography>
            <Divider orientation='vertical' flexItem></Divider>
            <Typography>Feedback: hellomuthu23@gmail.com</Typography>
            <Divider orientation='vertical' flexItem></Divider>
            <Button
              onClick={() =>
                (window.location.href =
                  'https://github.com/hellomuthu23/planning-poker/issues')
              }
            >
              Submit Issue
            </Button>
          </div>
        </div>
      </Slide>
    </footer>
  );
};
