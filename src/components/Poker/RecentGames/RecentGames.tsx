import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverTwoTone';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPlayerRecentGames, getCurrentPlayerId } from '../../../service/players';
import { Game } from '../../../types/game';
import './RecentGames.css';
import { removeGame } from '../../../service/games';
import { isModerator } from '../../../utils/isModerator';
import { AlertDialog } from '../../../components/AlertDialog/AlertDialog'

export const RecentGames = () => {
  const history = useHistory();
  const [recentGames, setRecentGames] = useState<Game[] | undefined>(undefined);
  const [reloadRecent, setReloadRecent] = useState<Boolean>(false);

  useEffect(() => {
    let fetchCleanup = true;
    getPlayerRecentGames().then(games => {
      if(fetchCleanup) {
        setRecentGames(games);
      }
    });
    return () => {fetchCleanup = false};
  }, [reloadRecent]);

  const isEmptyRecentGames = (): boolean => {
    if (!recentGames) {
      return true;
    }
    if (recentGames && recentGames.length === 0) {
      return true;
    }
    return false;
  };

  const handleRemoveGame = async ( recentGameId: string ) => {
    await removeGame(recentGameId);
    setReloadRecent(!reloadRecent);
  }

  return (
    <Card variant='outlined' className='RecentGamesCard'>
      <CardHeader
        className='RecentGamesCardTitle'
        title='Recent Session'
        titleTypographyProps={{ variant: 'h6', noWrap: true }}
      />
      <CardContent className='RecentGamesCardContent'>
        {isEmptyRecentGames() && (
          <Typography variant='body2'>No recent sessions found</Typography>
        )}
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
                {recentGames.map((recentGame) => (
                  <TableRow
                    hover
                    key={recentGame.id}
                    className='RecentGamesTableRow'
                    onClick={() => history.push(`/game/${recentGame.id}`)}
                  >
                    <TableCell>{recentGame.name}</TableCell>
                    <TableCell align='left'>{recentGame.createdBy}</TableCell>
                    {isModerator(recentGame.createdById, getCurrentPlayerId(recentGame.id)) ? 
                      <TableCell align='center' onClick={(e) => e.stopPropagation()}>
                        <AlertDialog 
                          title="Remove recent game" 
                          message={`Are you sure? That will delete the game: ${recentGame.name} and remove all players from the session.`} 
                          onConfirm={() => handleRemoveGame(recentGame.id)}
                        >
                          <DeleteForeverIcon style={{ color: red[300] }} />
                        </AlertDialog>
                      </TableCell> : 
                      <TableCell align='left'></TableCell> 
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};
