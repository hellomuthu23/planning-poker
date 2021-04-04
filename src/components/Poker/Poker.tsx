import { Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getGame } from '../../repository/games';
import { Toolbar } from '../Toolbar/Toolbar';
import { GameArea } from './GameArea/GameArea';
import './Poker.css';

export const Poker = () => {
  let { id } = useParams<{ id: string }>();
  console.log(id);
  const game = getGame(id);
  console.log(game);

  return (
    <>
      <Toolbar />
      {game ? (
        <GameArea game={game} />
      ) : (
        <Typography> Game not found</Typography>
      )}
    </>
  );
};

export default Poker;
