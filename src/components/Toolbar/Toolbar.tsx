import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import AppToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  header: {
    cursor: 'pointer',
    display: 'contents',
  },
}));

export const title = 'Planing Poker';

export const Toolbar = () => {
  const classes = useStyles();
  return (
    <AppBar position='relative'>
      <AppToolbar>
        <div
          className={classes.header}
          onClick={() => window.location.reload(false)}
        >
          <HomeIcon className={classes.icon} />
          <Typography variant='h6' color='inherit' noWrap>
            {title}
          </Typography>
        </div>
      </AppToolbar>
    </AppBar>
  );
};
