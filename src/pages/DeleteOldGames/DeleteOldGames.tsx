
import Grid from '@mui/material/Grid';
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
      <Grid container direction='column' justifyContent='center' alignItems='center' spacing={2}>
        <Grid container size={{ xs: 12, sm: 12, lg: 11 }} justifyContent='center' alignItems='center' spacing={3}>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            {isDeleteInProgress ? <div>Deleting old games.....</div> : <div>Delete done!</div>}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DeleteOldGames;
