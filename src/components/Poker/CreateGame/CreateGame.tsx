import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { animals, colors, Config, starWars, uniqueNamesGenerator } from 'unique-names-generator';
import { addNewGame } from '../../../service/games';
import { GameType, NewGame } from '../../../types/game';
import { getCards, getCustomCards } from '../../Players/CardPicker/CardConfigs';

const gameNameConfig: Config = {
  dictionaries: [colors, animals],
  separator: ' ',
  style: 'capital',
};
const userNameConfig: Config = {
  dictionaries: [starWars],
};

export const CreateGame = () => {
  const history = useHistory();
  const [gameName, setGameName] = useState(uniqueNamesGenerator(gameNameConfig));
  const [createdBy, setCreatedBy] = useState(uniqueNamesGenerator(userNameConfig));
  const [gameType, setGameType] = useState(GameType.Fibonacci);
  const [hasDefaults, setHasDefaults] = useState({ game: true, name: true });
  const [loading, setLoading] = useState(false);
  const [allowMembersToManageSession, setAllowMembersToManageSession] = useState(false);
  const [customOptions, setCustomOptions] = React.useState(Array(15).fill(''));
  const [error, setError] = React.useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (gameType === GameType.Custom) {
      const count = customOptions.reduce(
        (acc, option) => (option && option.trim() !== '' ? acc + 1 : acc),
        0,
      );
      setError(count < 2);
      if (count < 2) {
        return;
      }
    }
    setLoading(true);
    const game: NewGame = {
      name: gameName,
      createdBy: createdBy,
      gameType: gameType,
      isAllowMembersToManageSession: allowMembersToManageSession,
      cards: gameType === GameType.Custom ? getCustomCards(customOptions) : getCards(gameType),
      createdAt: new Date(),
    };
    const newGameId = await addNewGame(game);
    if (newGameId) {
      setLoading(false);
    }
    history.push(`/game/${newGameId}`);
  };

  const handleCustomOptionChange = (index: number, value: string) => {
    const newCustomOptions = [...customOptions];
    newCustomOptions[index] = value;
    setCustomOptions(newCustomOptions);
  };

  const emptyGameName = () => {
    if (hasDefaults.game) {
      setGameName('');
      hasDefaults.game = false;
      setHasDefaults({ ...hasDefaults });
    }
  };
  const emptyCreatorName = () => {
    if (hasDefaults.name) {
      setCreatedBy('');
      hasDefaults.name = false;
      setHasDefaults({ ...hasDefaults });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full flex justify-center'>
      <div className='w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg p-6 mt-6'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>
          {t('HomePage.heroSection.formNewSession.newSessionHeader')}
        </h2>
        <div className='flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>
              {t('HomePage.heroSection.formNewSession.sessionNameLabel')}
            </label>
            <input
              required
              type='text'
              className='w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400'
              placeholder='Enter a session name'
              value={gameName || ''}
              onClick={emptyGameName}
              onChange={(event) => setGameName(event.target.value)}
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>
              {t('HomePage.heroSection.formNewSession.yourNameLabel')}
            </label>
            <input
              required
              type='text'
              className='w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400'
              placeholder='Enter your name'
              value={createdBy || ''}
              onClick={emptyCreatorName}
              onChange={(event) => setCreatedBy(event.target.value)}
            />
          </div>
          <fieldset>
            <legend className='block text-sm font-medium mb-2'>Session Sizing Type</legend>
            <div className='flex flex-col gap-2'>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  className='form-radio text-blue-600'
                  name='gameType'
                  value={GameType.Fibonacci}
                  checked={gameType === GameType.Fibonacci}
                  onChange={() => setGameType(GameType.Fibonacci)}
                />
                <span className='ml-2'>Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  className='form-radio text-blue-600'
                  name='gameType'
                  value={GameType.ShortFibonacci}
                  checked={gameType === GameType.ShortFibonacci}
                  onChange={() => setGameType(GameType.ShortFibonacci)}
                />
                <span className='ml-2'>Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  className='form-radio text-blue-600'
                  name='gameType'
                  value={GameType.TShirt}
                  checked={gameType === GameType.TShirt}
                  onChange={() => setGameType(GameType.TShirt)}
                />
                <span className='ml-2'>T-Shirt (XXS, XS, S, M, L, XL, XXL)</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  className='form-radio text-blue-600'
                  name='gameType'
                  value={GameType.TShirtAndNumber}
                  checked={gameType === GameType.TShirtAndNumber}
                  onChange={() => setGameType(GameType.TShirtAndNumber)}
                />
                <span className='ml-2'>T-Shirt & Numbers (S, M, L, XL, 1, 2, 3, 4, 5)</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  className='form-radio text-blue-600'
                  name='gameType'
                  value={GameType.Custom}
                  checked={gameType === GameType.Custom}
                  onChange={() => setGameType(GameType.Custom)}
                />
                <span className='ml-2'>Custom</span>
              </label>
            </div>
          </fieldset>
          {gameType === GameType.Custom && (
            <>
              <div className='flex flex-wrap gap-2 mb-2'>
                {customOptions.map((option: any, index: number) => (
                  <input
                    key={index}
                    type='text'
                    maxLength={3}
                    className='w-12 border rounded px-2 py-1 text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={option}
                    onChange={(event) => handleCustomOptionChange(index, event.target.value)}
                    data-testid={`custom-option-${index}`}
                  />
                ))}
              </div>
              {error && (
                <p className='text-red-600 text-xs mt-1'>
                  Please enter values for at least two custom option.
                </p>
              )}
            </>
          )}
          <label className='inline-flex items-center mt-2'>
            <input
              type='checkbox'
              className='form-checkbox text-blue-600'
              checked={allowMembersToManageSession}
              onChange={() => setAllowMembersToManageSession(!allowMembersToManageSession)}
            />
            <span className='ml-2'>Allow members to manage session</span>
          </label>
        </div>
        <div className='flex justify-end mt-6'>
          <button
            type='submit'
            className={`bg-blue-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
            data-testid='loading'
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};
