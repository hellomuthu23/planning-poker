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
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getPlayerRecentGames } from '../../../service/games';
import { Game } from '../../../types/game';
import './RecentGames.css';

export const RecentGames = () => {
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
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentGames &&
                recentGames.map((recentGame) => (
                  <TableRow key={recentGame.id}>
                    <TableCell component='th' scope='row'>
                      {recentGame.name}
                    </TableCell>
                    <TableCell align='right'>{recentGame.createdBy}</TableCell>
                    <TableCell align='right'>Enter</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
