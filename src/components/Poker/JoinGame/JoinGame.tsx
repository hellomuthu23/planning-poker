import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getGame } from '../../../service/games';
import { addPlayerToGame, isCurrentPlayerInGame } from '../../../service/players';

export const JoinGame = () => {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();

  const [joinGameId, setJoinGameId] = useState(id);
  const [playerName, setPlayerName] = useState(
    () => localStorage.getItem('recentPlayerName') || '',
  );
  const [gameFound, setIsGameFound] = useState(true);
  const [showNotExistMessage, setShowNotExistMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (joinGameId) {
        if (await getGame(joinGameId)) {
          setIsGameFound(true);
          if (await isCurrentPlayerInGame(joinGameId)) {
            history.push(`/game/${joinGameId}`);
          }
        } else {
          setShowNotExistMessage(true);
          setTimeout(() => {
            history.push('/');
          }, 5000);
        }
      }
    }
    fetchData();
  }, [joinGameId, history]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const gameId = (form.elements.namedItem('joinGameId') as HTMLInputElement)?.value;
    const playerName = (form.elements.namedItem('playerName') as HTMLInputElement)?.value;

    setLoading(true);
    if (joinGameId) {
      localStorage.setItem('recentPlayerName', playerName);
      const res = await addPlayerToGame(gameId, playerName);

      setIsGameFound(res);
      if (res) {
        history.push(`/game/${joinGameId}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className='w-full flex justify-center'>
        <div className='w-full max-w-lg  border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-6'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Join a Session</h2>
          <div className='flex flex-col gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Session ID</label>
              <input
                id='joinGameId'
                required
                type='text'
                className={`w-full border border-gray-400 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                  !gameFound ? 'border-red-500' : ''
                }`}
                placeholder='xyz...'
                value={joinGameId || ''}
                onChange={(e) => setJoinGameId(e.target.value)}
              />
              {!gameFound && (
                <p className='text-red-600 text-xs mt-1'>Session not found, check the ID</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Your Name</label>
              <input
                required
                id='playerName'
                type='text'
                className='w-full border border-gray-400 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400'
                placeholder='Enter your name'
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className={`bg-blue-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-blue-700 transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Joining...' : 'Join'}
            </button>
          </div>
        </div>
      </form>
      {showNotExistMessage && (
        <div className='fixed top-6 right-6 z-50'>
          <div
            className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow'
            role='alert'
          >
            <span className='block font-bold'>Session was deleted and doesn't exist anymore!</span>
          </div>
        </div>
      )}
    </div>
  );
};
