import { Grid } from '@material-ui/core';
import React from 'react';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';

export const JoinPage = () => {
  return (
    <>
      <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
        <Grid container item sm={12} lg={11} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            <JoinGame />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default JoinPage;
