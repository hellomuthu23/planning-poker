import { updateGame } from '../repository/games';
import { Game } from '../types/game';
import { Player } from '../types/player';
import { Status } from '../types/status';
import {
  ActionType,
  AddPlayer,
  FinishGame,
  GameActions,
  ResetGame,
  SetPlayerValue,
} from './actions';

export function gameReducer(state: Game, action: GameActions): Game {
  switch (action.type) {
    case ActionType.AddPlayer:
      const updateState = {
        ...state,
        players: [action.payload, ...state.players],
      };
      updateGame(updateState);
      return updateState;
    case ActionType.ResetGame:
      const updatedState = {
        ...state,
        players: state.players.map((player) => ({
          ...player,
          status: Status.NotStarted,
          value: 0,
        })),
      };
      updateGame(updatedState);
      return updatedState;
    case ActionType.FinishGame:
      const finishedState = {
        ...state,
        gameStatus: Status.Finished,
      };
      updateGame(finishedState);
      return finishedState;
    case ActionType.SetPlayerValue:
      let newState = {
        ...state,
        players: state.players.map((player: Player) =>
          player.id === action.payload.id
            ? {
                ...player,
                value: action.payload.value,
                status: Status.Finished,
              }
            : player
        ),
      };
      newState = {
        ...newState,
        average: getAverage(newState.players),
        gameStatus: getGameStatus(newState),
      };
      updateGame(newState);
      return newState;

    default:
      return state;
  }
}

const getAverage = (players: Player[]): number => {
  let values = 0;
  let numberOfPlayersPlayed = 0;
  players.forEach((player) => {
    if (player.status === Status.Finished && player.value) {
      values = values + player.value;
      numberOfPlayersPlayed++;
    }
  });
  return values / numberOfPlayersPlayed;
};

const getGameStatus = (state: Game): Status => {
  const totalPlayers = state.players.length;
  let numberOfPlayersPlayed = 0;
  state.players.forEach((player: Player) => {
    if (player.status === Status.Finished) {
      numberOfPlayersPlayed++;
    }
  });
  if (numberOfPlayersPlayed === 0) {
    return Status.NotStarted;
  }
  if (totalPlayers === numberOfPlayersPlayed) {
    return Status.Finished;
  }
  return Status.InProgress;
};

// helper functions to simplify the caller
export const addPlayer = (player: Player): AddPlayer => ({
  type: ActionType.AddPlayer,
  payload: player,
});

export const setPlayerValue = (id: string, value: number): SetPlayerValue => ({
  type: ActionType.SetPlayerValue,
  payload: { id, value },
});

export const resetGame = (): ResetGame => ({
  type: ActionType.ResetGame,
});

export const finishGame = (): FinishGame => ({
  type: ActionType.FinishGame,
});
