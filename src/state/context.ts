import React from 'react';
import { Game } from '../types/game';
import { Status } from '../types/status';
import { GameActions } from './actions';

const initialGameState: Game = {
  id: '',
  name: '',
  average: 0,
  players: [],
  createdAt: new Date(),
  createdBy: '',

  gameStatus: Status.NotStarted,
};
export const GameContext = React.createContext<{
  state: Game;
  dispatch: React.Dispatch<GameActions>;
}>({
  state: initialGameState,
  dispatch: () => undefined,
});
