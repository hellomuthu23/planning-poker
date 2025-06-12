import { useEffect, useState } from 'react';
import { deleteOldGames } from '../../service/games';

export const DeleteOldGames = () => {
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

  useEffect(() => {
    async function deleteData() {
      await deleteOldGames();
      setIsDeleteInProgress(false);
    }
    setIsDeleteInProgress(true);
    deleteData();
  }, [setIsDeleteInProgress]);

  return (
    <>
      <div className='flex flex-col items-center justify-center space-y-2'>
        <div className='flex items-center justify-center sm:w-full lg:w-11/12 space-x-3'>
          <div className='sm:w-full lg:w-1/2'>
            {isDeleteInProgress ? <div>Deleting old games.....</div> : <div>Delete done!</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteOldGames;
