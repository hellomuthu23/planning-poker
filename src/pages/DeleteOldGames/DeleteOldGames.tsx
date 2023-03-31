import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { deleteOldGames } from '../../service/games';

export const DeleteOldGames = () => {
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

  useEffect(() => {
    async function deleteData() {
      await deleteOldGames();
      setIsDeleteInProgress(false);
    }
    setIsDeleteInProgress(true);
    deleteData();
  }, [setIsDeleteInProgress]);

  return (
    <>
      <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
        <Grid container item sm={12} lg={11} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            {isDeleteInProgress ? <div>Deleting old games.....</div> : <div>Delete done!</div>}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DeleteOldGames;
