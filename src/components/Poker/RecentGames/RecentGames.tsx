import {
  Card,
  CardContent,
  CardHeader, Fade, Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForeverTwoTone';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getPlayerRecentGames } from '../../../service/players';
import './RecentGames.css';
import { removeGame } from '../../../service/games';
import { AlertDialog } from '../../AlertDialog/AlertDialog';
import { PlayerGame } from '../../../types/player';
import Alert from '@mui/material/Alert';


export const RecentGames = () => {
  const navigate = useNavigate();
  const [recentGames, setRecentGames] = useState<PlayerGame[] | undefined>(undefined);
  const [reloadRecent, setReloadRecent] = useState<Boolean>(false);
  const [showGameProtected, setShowGameProtected] = useState(false);


  useEffect(() => {
    let fetchCleanup = true;

    async function fetchRecent() {
      const games = await getPlayerRecentGames();
      if (games && fetchCleanup) {
        setRecentGames(games);
      }
    }

    fetchRecent();

    return () => {
      fetchCleanup = false;
    };
  }, [reloadRecent]);

  const isEmptyRecentGames = (): boolean => {
    if (!recentGames) {
      return true;
    }
    return recentGames && recentGames.length === 0;
  };

  const handleRemoveGame = async (recentGameId: string) => {
    await removeGame(recentGameId);
    setReloadRecent(!reloadRecent);
  };


  return (
    <>
    <Card variant='outlined' className='RecentGamesCard'>
      <CardHeader
        className='RecentGamesCardTitle'
        title='Recent Session'
        slotProps={{ title: { variant: 'h6', noWrap: true }}}
      />
      <CardContent className='RecentGamesCardContent'>
        {isEmptyRecentGames() && <Typography variant='body2'>No recent sessions found</Typography>}
        {recentGames && recentGames.length > 0 && (
          <TableContainer className='RecentGamesTableContainer'>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentGames.map(
                  (recentGame) =>
                    recentGame.name && (
                      <TableRow
                        hover
                        key={recentGame.id}
                        className='RecentGamesTableRow'
                        onClick={() => navigate(`/game/${recentGame.id}`)}
                      >
                        <TableCell>{recentGame.name}</TableCell>
                        <TableCell align='left'>{recentGame.createdBy}</TableCell>
                        { recentGame.isModerator ? (
                          recentGame.isLocked ? (
                            <TableCell align='center' onClick={(e) => e.stopPropagation()} title={'Deleting the game is not allowed'}>
                              <DeleteForeverIcon style={{ color: '#bbb', filter: 'grayscale(100%)'}}

                                                 onClick={() => setShowGameProtected(true)} />
                            </TableCell>
                          ) : (
                            <TableCell align='center' onClick={(e) => e.stopPropagation()}>
                              <AlertDialog
                                title='Remove recent game'
                                message={`Are you sure? That will delete the game: ${recentGame.name} and remove all players from the session.`}
                                onConfirm={() => handleRemoveGame(recentGame.id)}
                              >
                                <DeleteForeverIcon style={{ color: red[300] }} />
                              </AlertDialog>
                            </TableCell>
                          )
                        ) : (
                          <TableCell align='left'></TableCell>
                        )}
                      </TableRow>
                    ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={showGameProtected}
        autoHideDuration={5000}
        slotProps={{ transition: Fade }}
        transitionDuration={1000}
        onClose={() => setShowGameProtected(false)}
      >
        <Alert severity='error'>Deleting the game is not allowed!</Alert>
      </Snackbar>
    </>
);
};
