import { CircularProgress, Typography } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { streamGame, streamPlayers } from '../../service/games';
import { getCurrentPlayerId } from '../../service/players';
import { Game } from '../../types/game';
import { Player } from '../../types/player';
import { GameArea } from './GameArea/GameArea';
import './Poker.css';

export const Poker = () => {
  let { id } = useParams<{ id: string }>() as { id: string };
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(undefined);

  // TODO: Re-implement blocker in React Router v6 using useBlocker hook
  // useEffect(() => {
  //   const unblock = history.block((location, action) => {
  //     if (action === 'POP') {
  //       // Detect back navigation
  //       const confirmLeave = window.confirm('Are you sure you want to go back?');
  //       if (!confirmLeave) {
  //         return false; // Prevent navigation
  //       }
  //     }
  //     return; // Allow navigation
  //   });
  //
  //   return () => {
  //     unblock(); // Cleanup the listener when the component unmounts
  //   };
  // }, []);

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

    const unsubscribeGame = onSnapshot(streamGame(id), (snapshot) => {
      if (effectCleanup) {
        if (snapshot.exists()) {
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

    const unsubscribePlayers = onSnapshot(streamPlayers(id), (snapshot) => {
      if (effectCleanup) {
        const players: Player[] = [];
        snapshot.forEach((snapshot) => {
          players.push(snapshot.data() as Player);
        });
        const currentPlayerId = getCurrentPlayerId(id);
        setPlayers(players);
        if (!players.find((player) => player.id === currentPlayerId)) {
          navigate(`/join/${id}`);
        }
      }
    });

    return () => {
      effectCleanup = false;
      unsubscribeGame();
      unsubscribePlayers();
    };
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
      {game && players && currentPlayerId ? (
        <GameArea game={game} players={players} currentPlayerId={currentPlayerId} />
      ) : (
        <Typography>Game not found</Typography>
      )}
    </>
  );
};

export default Poker;