import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grow,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { uniqueNamesGenerator, Config, starWars, colors, animals } from 'unique-names-generator';
import { useHistory } from 'react-router-dom';
import { addNewGame } from '../../../service/games';
import { GameType, NewGame } from '../../../types/game';
import './CreateGame.css';
import { useTranslation } from 'react-i18next';
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
  const [customOptions, setCustomOptions] = React.useState(Array(10).fill(''));
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

    // Count the number of custom options that have a value
  };

  const emptyGameName = () => {
    if (hasDefaults.game) {
      setGameName('');
      hasDefaults.game = false;
      setHasDefaults(hasDefaults);
    }
  };
  const emptyCreatorName = () => {
    if (hasDefaults.name) {
      setCreatedBy('');
      hasDefaults.name = false;
      setHasDefaults(hasDefaults);
    }
  };

  return (
    <Grow in={true} timeout={1000}>
      <form onSubmit={handleSubmit}>
        <Card variant='outlined' className='CreateGameCard'>
          <CardHeader
            className='CreateGameCardHeader'
            title={t('HomePage.heroSection.formNewSession.newSessionHeader')}
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent className='CreateGameCardContent'>
            <TextField
              className='CreateGameTextField'
              required
              id='filled-required'
              label={t('HomePage.heroSection.formNewSession.sessionNameLabel')}
              placeholder='Enter a session name'
              value={gameName || ''}
              onClick={() => emptyGameName()}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setGameName(event.target.value)}
            />
            <TextField
              className='CreateGameTextField'
              required
              id='filled-required'
              label={t('HomePage.heroSection.formNewSession.yourNameLabel')}
              placeholder='Enter your name'
              value={createdBy || ''}
              onClick={() => emptyCreatorName()}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setCreatedBy(event.target.value)}
            />
            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={gameType}
              onChange={(
                event: ChangeEvent<{
                  name?: string | undefined;
                  value: any;
                }>,
              ) => setGameType(event.target.value)}
            >
              <FormControlLabel
                value={GameType.Fibonacci}
                control={<Radio color='primary' size='small' />}
                label='Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)'
              />
              <FormControlLabel
                value={GameType.ShortFibonacci}
                control={<Radio color='primary' size='small' />}
                label='Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)'
              />
              <FormControlLabel
                value={GameType.TShirt}
                control={<Radio color='primary' size='small' />}
                label='T-Shirt (XXS, XS, S, M, L, XL, XXL)'
              />
              <FormControlLabel
                value={GameType.TShirtAndNumber}
                control={<Radio color='primary' size='small' />}
                label='T-Shirt & Numbers (S, M, L, XL, 1, 2, 3, 4, 5)'
              />
              <FormControlLabel
                value={GameType.Custom}
                control={<Radio color='primary' size='small' />}
                label='Custom'
              />
            </RadioGroup>
            {gameType === GameType.Custom && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {customOptions.map((option: any, index: number) => (
                    <TextField
                      key={index}
                      margin='dense'
                      id={`custom-option-${index}`}
                      data-testid={`custom-option-${index}`}
                      inputProps={{ maxLength: 3, style: { fontSize: '12px', padding: '10px' } }}
                      type='text'
                      variant='outlined'
                      className='CreateGameCustomTextField'
                      value={option}
                      onChange={(event) => handleCustomOptionChange(index, event.target.value)}
                    />
                  ))}
                </div>
                {error && (
                  <p className='CreateGameErrorMessage'>
                    Please enter values for at least two custom option.
                  </p>
                )}
              </>
            )}
          </CardContent>
          <CardActions className='CreateGameCardAction'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='CreateGameButton'
              data-testid='loading'
              disabled={loading}
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </Grow>
  );
};
