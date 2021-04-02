import { Player } from './state';

export enum ActionType {
  AddPlayer,
  SetPlayerValue,
  ResetGame,
}

export interface AddPlayer {
  type: ActionType.AddPlayer;
  payload: Player;
}

export interface SetPlayerValue {
  type: ActionType.SetPlayerValue;
  payload: { id: number; value: number };
}

export interface ResetGame {
  type: ActionType.ResetGame;
}

export type GameActions = AddPlayer | SetPlayerValue | ResetGame;
