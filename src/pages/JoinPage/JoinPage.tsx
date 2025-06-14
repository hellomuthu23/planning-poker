import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';

export const JoinPage = () => {
  return (
    <div className='flex flex-col items-center w-full py-8'>
      <div className='w-full max-w-5xl flex justify-center'>
        <div className='w-full max-w-xl animate-fade-in-down'>
          <JoinGame />
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
