import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { streamGame, streamPlayers } from '../../service/games';
import { getCurrentPlayerId } from '../../service/players';
import { Game } from '../../types/game';
import { Player } from '../../types/player';
import { Loading } from '../Loading/Loading';
import { GameArea } from './GameArea/GameArea';

export const Poker = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (action === 'POP') {
        // Detect back navigation
        const confirmLeave = window.confirm('Are you sure you want to go back?');
        if (!confirmLeave) {
          return false; // Prevent navigation
        }
      }
      return; // Allow navigation
    });

    return () => {
      unblock(); // Cleanup the listener when the component unmounts
    };
  }, [history]);

  useEffect(() => {
    let effectCleanup = true;

    if (effectCleanup) {
      const currentPlayerId = getCurrentPlayerId(id);
      if (!currentPlayerId) {
        history.push(`/join/${id}`);
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
          history.push(`/join/${id}`);
        }
        setPlayers(players);
      }
    });

    return () => {
      effectCleanup = false;
    };
  }, [id, history]);

  if (loading) {
    return (
      <div className='flex items-center justify-center p-10'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {game && players && currentPlayerId ? (
        <GameArea game={game} players={players} currentPlayerId={currentPlayerId} />
      ) : (
        <p>Game not found</p>
      )}
    </>
  );
};

export default Poker;
