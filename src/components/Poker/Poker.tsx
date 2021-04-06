import { CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentPlayerId, streamGame } from '../../service/games';
import { Game } from '../../types/game';
import { GameArea } from './GameArea/GameArea';
import './Poker.css';

export const Poker = () => {
  let { id } = useParams<{ id: string }>();

  const [game, setGame] = useState<Game | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchData(id: string) {
      streamGame(id).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change: any) => {
          const data = change.doc.data();
          if (data) {
            setGame(data);
          }
        });
      });
      setCurrentPlayerId(getCurrentPlayerId(id));
      setIsLoading(false);
    }
    fetchData(id);
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {game && currentPlayerId ? (
        <GameArea game={game} currentPlayerId={currentPlayerId} />
      ) : (
        <Typography> Game not found</Typography>
      )}
    </>
  );
};

export default Poker;
