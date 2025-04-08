import { CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { streamGame, streamPlayers } from '../../service/games';
import { getCurrentPlayerId } from '../../service/players';
import { Game } from '../../types/game';
import { Player } from '../../types/player';
import { GameArea } from './GameArea/GameArea';
import './Poker.css';

export const Poker = () => {
  let { id } = useParams<'id'>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(undefined);

  useEffect(() => {
    let effectCleanup = true;

    if (effectCleanup) {
      const currentPlayerId = getCurrentPlayerId(id);
      if (!currentPlayerId) {
        navigate(`/join/${id}`);
      }

      setCurrentPlayerId(currentPlayerId);
      setIsLoading(true);
    }

    streamGame(id).onSnapshot((snapshot) => {
      if (effectCleanup) {
        if (snapshot.exists) {
          const data = snapshot.data();
          if (data) {
            setGame(data as Game);
            setIsLoading(false);
            return;
          }
        }
        setIsLoading(false);
      }
    });

    streamPlayers(id).onSnapshot((snapshot) => {
      if (effectCleanup) {
        const players: Player[] = [];
        snapshot.forEach((snapshot) => {
          players.push(snapshot.data() as Player);
        });
        const currentPlayerId = getCurrentPlayerId(id);
        if (!players.find((player) => player.id === currentPlayerId)) {
          navigate(`/join/${id}`);
        }
        setPlayers(players);
      }
    });

    return () => {
      effectCleanup = false;
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <div className='PokerLoading'>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {game && players && currentPlayerId ? (
        <GameArea game={game} players={players} currentPlayerId={currentPlayerId} />
      ) : (
        <Typography>Game not found</Typography>
      )}
    </>
  );
};

export default Poker;
