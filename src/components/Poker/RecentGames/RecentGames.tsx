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

  return (
    <Card variant='outlined' className='RecentGamesCard'>
      <CardHeader
        className='RecentGamesCardTitle'
        title='Recent Session'
        titleTypographyProps={{ variant: 'h6', noWrap: true }}
      />
      <CardContent className='RecentGamesCardContent'>
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
              {!recentGames ||
                (recentGames && recentGames.length === 0 && (
                  <Typography variant='body2'>
                    No recent sessions found
                  </Typography>
                ))}

              {recentGames &&
                recentGames.map((recentGame) => (
                  <TableRow
                    hover
                    key={recentGame.id}
                    className='RecentGamesTableRow'
                    onClick={() => history.push(`game/${recentGame.id}`)}
                  >
                    <TableCell component='th' scope='row'>
                      {recentGame.name}
                    </TableCell>
                    <TableCell align='left'>{recentGame.createdBy}</TableCell>
                    <TableCell align='left'></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
