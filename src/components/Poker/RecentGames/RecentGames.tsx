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
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPlayerRecentGames } from '../../../service/players';
import { Game } from '../../../types/game';
import './RecentGames.css';

export const RecentGames = () => {
  const history = useHistory();
  const [recentGames, setRecentGames] = useState<Game[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const games = await getPlayerRecentGames();
      if (games) {
        setRecentGames(games);
      }
    }
    fetchData();
  }, []);

  const isEmptyRecentGames = (): boolean => {
    if (!recentGames) {
      return true;
    }
    if (recentGames && recentGames.length === 0) {
      return true;
    }
    return false;
  };

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
                    <TableCell align='left'></TableCell>
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
