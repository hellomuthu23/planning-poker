import { Player } from '../types/player';

export enum ActionType {
  AddPlayer,
  SetPlayerValue,
  ResetGame,
  FinishGame,
}

export interface AddPlayer {
  type: ActionType.AddPlayer;
  payload: Player;
}

export interface SetPlayerValue {
  type: ActionType.SetPlayerValue;
  payload: { id: string; value: number };
}

export interface ResetGame {
  type: ActionType.ResetGame;
}

export interface FinishGame {
  type: ActionType.FinishGame;
}

export type GameActions = AddPlayer | SetPlayerValue | ResetGame | FinishGame;
