import { ulid } from 'ulid';
import {
  addData,
  getData,
  streamData,
  updateData,
} from '../repository/firebase';
import { Game, NewGame } from '../types/game';
import { Player, PlayerGame } from '../types/player';
import { Status } from '../types/status';

const playerGamesStoreName = 'playerGames';
export const addNewGame = (newGame: NewGame): string => {
  const game: Game = {
    ...newGame,
    id: ulid(),
    average: 0,
    gameStatus: Status.NotStarted,
    players: [
      { name: newGame.createdBy, id: ulid(), status: Status.NotStarted },
    ],
  };

  updatePlayerGames(game.id, game.players[0].id);
  addData(game);
  return game.id;
};

export const streamGame = (id: string) => {
  return streamData(id);
};

export const getGame = (id: string) => {
  return getData(id);
};

export const updateGame = (updatedGame: Game): boolean => {
  updateData(updatedGame);
  return true;
};

export const joinGame = async (
  gameId: string,
  playerName: string
): Promise<boolean> => {
  const joiningGame = await getData(gameId);

  if (!joiningGame) {
    console.log('Game not found');
    return false;
  }
  const newPlayer = { name: playerName, id: ulid(), status: Status.NotStarted };
  joiningGame.players.push(newPlayer);

  updatePlayerGames(gameId, newPlayer.id);
  await updateData(joiningGame);

  return true;
};

const updatePlayerGames = (gameId: string, playerId: string) => {
  let playerGames: PlayerGame[] = [];
  const store = localStorage.getItem(playerGamesStoreName);
  if (store) {
    playerGames = JSON.parse(store);
  }
  playerGames.push({ gameId, playerId });

  localStorage.setItem(playerGamesStoreName, JSON.stringify(playerGames));
};

export const getCurrentPlayerId = (gameId: string): string | undefined => {
  let playerGames: PlayerGame[] = [];
  const store = localStorage.getItem(playerGamesStoreName);

  if (store) {
    playerGames = JSON.parse(store);
  }
  const game = playerGames.find((playerGame) => playerGame.gameId === gameId);

  return game && game.playerId;
};

export const resetGame = async (gameId: string) => {
  const game = await getGame(gameId);
  if (game) {
    const updatedGame = {
      ...game,
      average: 0,
      players: game.players.map((player) => ({
        ...player,
        status: Status.NotStarted,
        value: 0,
      })),
    };
    updateGame(updatedGame);
  }
};

export const finishGame = async (gameId: string) => {
  const game = await getGame(gameId);

  if (game) {
    const updatedGame = {
      ...game,
      gameStatus: Status.Finished,
    };
    updateGame(updatedGame);
  }
};

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

export const updatePlayerValue = async (
  gameId: string,
  playerId: string,
  value: number
) => {
  const game = await getGame(gameId);

  if (game) {
    const updatedGame = {
      ...game,
      players: game.players.map((player: Player) =>
        player.id === playerId
          ? {
              ...player,
              value: value,
              status: Status.Finished,
            }
          : player
      ),
    };
    const updatedGame2 = {
      ...updatedGame,
      average: getAverage(updatedGame.players),
      gameStatus: getGameStatus(updatedGame),
    };
    updateGame(updatedGame2);
  }
};

export const addPlayer = async (gameId: string, player: Player) => {
  const game = await getGame(gameId);
  if (game) {
    const updatedGame = {
      ...game,
      players: [player, ...game.players],
    };
    updateGame(updatedGame);
  }
};
