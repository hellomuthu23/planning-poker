import React from 'react';
import { GameState, initialGameState } from './state';
import { GameActions } from './actions';

export const GameContext = React.createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
}>({
  state: initialGameState,
  dispatch: () => undefined,
});
