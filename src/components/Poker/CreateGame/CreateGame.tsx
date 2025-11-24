import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grow,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { addNewGame } from '../../../service/games';
import { GameType, NewGame } from '../../../types/game';
import { getCards, getCustomCards } from '../../Players/CardPicker/CardConfigs';
import './CreateGame.css';

export const CreateGame = () => {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [gameType, setGameType] = useState(GameType.ShortFibonacci);
  const [hasDefaults, setHasDefaults] = useState({ game: true, name: true });
  const [loading, setLoading] = useState(false);
  const [allowMembersToManageSession, setAllowMembersToManageSession] = useState(true);
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
    navigate(`/game/${newGameId}`);
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
            slotProps={{ title: { variant: 'h4' } }}
          />
          <CardContent className='CreateGameCardContent'>
            <TextField
              name='sessionName'
              className='CreateGameTextField'
              required
              id='sessionNamerequired'
              label={t('HomePage.heroSection.formNewSession.sessionNameLabel')}
              placeholder='Enter a session name'
              value={gameName || ''}
              onClick={() => emptyGameName()}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setGameName(event.target.value)}
            />
            <TextField
              name='playerName'
              className='CreateGameTextField'
              required
              id='playerNameRequired'
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
                value={GameType.ShortFibonacci}
                control={<Radio color='primary' size='small' />}
                label='Short Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 40)'
              />
              <FormControlLabel
                value={GameType.Fibonacci}
                control={<Radio color='primary' size='small' />}
                label='Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)'
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
                      slotProps={{
                        htmlInput: { maxLength: 3, style: { fontSize: '12px', padding: '10px' } },
                      }}
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
            <FormControlLabel
              control={
                <Checkbox
                  name='allowMembersToManageSession'
                  color='primary'
                  checked={allowMembersToManageSession}
                  onChange={() => setAllowMembersToManageSession(!allowMembersToManageSession)}
                />
              }
              label='Allow members to manage session'
            />
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
