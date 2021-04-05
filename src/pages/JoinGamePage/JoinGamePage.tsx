import React from 'react';
import { useParams } from 'react-router-dom';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import './JoinGamePage.css';

export const JoinGamePage = () => {
  let { id } = useParams<{ id: string }>();
  return (
    <>
      <div className='Home'>
        <JoinGame gameId={id} />
      </div>
    </>
  );
};
