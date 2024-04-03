import { Divider, Slide, Typography } from '@material-ui/core';
import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <Slide in={true} direction='up' timeout={3000}>
        <div className='FooterSection'>
          <Divider variant='middle'></Divider>
          <div className='FooterContainer'>
            <div className='FooterItemContainer'>
              <Typography color='textSecondary' variant='body2'>
                Zonda Home Planning Poker Instance
              </Typography>
            </div>
            </div>
        </div>
      </Slide>
    </footer>
  );
};
