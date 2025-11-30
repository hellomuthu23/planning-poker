import { Divider, Link, Slide, Typography } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
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
              <Link href='https://github.com/hellomuthu23/planning-poker'
                    color="textSecondary"
                    underline={"none"}
              >
              <Typography color='textSecondary' variant='body2' component='span' className='copyright-vertical-center'>
                <CopyrightIcon color='secondary' fontSize='small' /> hellomuthu23
              </Typography>
              </Link>
            </div>
            <div className='FooterItemContainer'>
              <Typography color='textSecondary' variant='body2'>
                v{import.meta.env.PACKAGE_VERSION}
              </Typography>
            </div>
          </div>
        </div>
      </Slide>
    </footer>
  );
};
