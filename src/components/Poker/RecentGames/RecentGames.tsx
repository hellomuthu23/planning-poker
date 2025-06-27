import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AlertDialog } from '../../../components/AlertDialog/AlertDialog';
import { removeGame } from '../../../service/games';
import { getCurrentPlayerId, getPlayerRecentGames } from '../../../service/players';
import { PlayerGame } from '../../../types/player';
import { isModerator } from '../../../utils/isModerator';
import { DeleteSVG } from '../../SVGs/DeleteSVG';

export const RecentGames = () => {
  const history = useHistory();
  const [recentGames, setRecentGames] = useState<PlayerGame[] | undefined>(undefined);
  const [reloadRecent, setReloadRecent] = useState<Boolean>(false);

  useEffect(() => {
    let fetchCleanup = true;

    async function fetchRecent() {
      const games = await getPlayerRecentGames();
      if (games && fetchCleanup) {
        setRecentGames(games);
      }
    }

    fetchRecent();

    return () => {
      fetchCleanup = false;
    };
  }, [reloadRecent]);

  const isEmptyRecentGames = (): boolean => {
    if (!recentGames) {
      return true;
    }
    if (recentGames && recentGames.length === 0) {
      return true;
    }
    return false;
  };

  const handleRemoveGame = async (recentGameId: string) => {
    await removeGame(recentGameId);
    setReloadRecent(!reloadRecent);
  };

  return (
    <div className='border border-gray-400 rounded-md shadow-sm'>
      <div className='text-center -mt-5 mx-auto w-[95%] border-2 bg-white dark:bg-gray-800 border-gray-400 rounded-2xl flex items-center justify-center px-3 py-1'>
        <h6 className='text-lg font-medium  truncate'>Recent Session</h6>
      </div>
      <div className='p-4'>
        {isEmptyRecentGames() && <p className='text-sm'>No recent sessions found</p>}
        {recentGames && recentGames.length > 0 && (
          <div className='overflow-x-auto' style={{ maxHeight: 250 }}>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 px-6 py-3 text-left text-xs font-bold tracking-wider'>
                    Name
                  </th>
                  <th className='sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 px-6 py-3 text-left text-xs font-bold  tracking-wider'>
                    Created By
                  </th>
                  <th className='sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 px-6 py-3 text-left text-xs font-medium  tracking-wider'></th>
                </tr>
              </thead>
              <tbody className=''>
                {recentGames.map(
                  (recentGame) =>
                    recentGame.name && (
                      <tr
                        key={recentGame.id}
                        className='hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-t border-gray-200'
                        onClick={() => history.push(`/game/${recentGame.id}`)}
                      >
                        <td className='px-6 py-4 text-sm'>{recentGame.name}</td>
                        <td className='px-6 py-4 text-sm'>{recentGame.createdBy}</td>
                        {isModerator(
                          recentGame.createdById,
                          getCurrentPlayerId(recentGame.id),
                          recentGame.isAllowMembersToManageSession,
                        ) ? (
                          <td
                            className='px-6 py-4 whitespace-nowrap text-sm'
                            onClick={(e) => e.stopPropagation()}
                          >
                            <AlertDialog
                              id={recentGame.id}
                              message={`Are you sure? That will delete the session: ${recentGame.name} and remove all players from the session.`}
                              onConfirm={(id: string) => handleRemoveGame(id)}
                            >
                              <DeleteSVG className='h-5 w-5 text-red-400' />
                            </AlertDialog>
                          </td>
                        ) : (
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'></td>
                        )}
                      </tr>
                    ),
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
