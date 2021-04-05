import { ulid } from 'ulid';
import { Game, NewGame } from '../types/game';
import { PlayerGame } from '../types/player';
import { Status } from '../types/status';
import { addData, getData, updateData } from './firebase';

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

export const getGame = async (id: string): Promise<Game | undefined> => {
  const game = await getData(id);
  return game;
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
