import React from 'react';
import { useParams } from 'react-router-dom';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import { getGame } from '../../repository/games';
import './JoinGamePage.css';

export const JoinGamePage = () => {
  let { id } = useParams<{ id: string }>();
  const game = getGame(id);
  console.log(game);
  return (
    <>
      <div className='Home'>
        <JoinGame gameId={id} />
      </div>
    </>
  );
};
