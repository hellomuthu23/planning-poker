import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { ulid } from 'ulid';
import { GameContext } from '../../../state/context';
import { addPlayer } from '../../../state/reducer';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';

export const AddPlayer = () => {
  const { dispatch } = useContext(GameContext);
  const [playerName, setPlayerName] = useState('');
  const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };
  const handleSubmit = (event: FormEvent) => {
    const player: Player = {
      id: ulid(),
      name: playerName,
      status: Status.NotStarted,
    };
    dispatch(addPlayer(player));
    setPlayerName('');
    event.preventDefault();
  };
  return (
    <>
      <h4>Add New Player</h4>
      <form onSubmit={handleSubmit}>
        <input
          value={playerName}
          type='text'
          onChange={handlePlayerNameChange}
        />
        <button type='submit' value='Submit' disabled={playerName === ''}>
          Add
        </button>
      </form>
    </>
  );
};
