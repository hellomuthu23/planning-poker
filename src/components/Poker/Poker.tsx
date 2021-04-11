import { CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentPlayerId, streamGame } from '../../service/games';
import { Game } from '../../types/game';
import { GameArea } from './GameArea/GameArea';
import './Poker.css';

export const Poker = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchData(id: string) {
      setIsLoading(true);
      streamGame(id).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change: any) => {
          const data = change.doc.data();
          if (data) {
            setGame(data);
            setIsLoading(false);
          }
        });
      });
      const currentPlayerId = getCurrentPlayerId(id);
      if (!currentPlayerId) {
        history.push(`/join/${id}`);
      }
      setCurrentPlayerId(currentPlayerId);
    }
    fetchData(id);
  }, [id, history]);

  if (loading) {
    return (
      <div className='PokerLoading'>
        <CircularProgress />
      </div>
    );
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
