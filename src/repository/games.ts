import { ulid } from 'ulid';
import { Game, NewGame } from '../types/game';
import { PlayerGame } from '../types/player';
import { Status } from '../types/status';

const gamesStoreName = 'games';
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

  let games: Game[] = [];
  const store = localStorage.getItem(gamesStoreName);
  if (store) {
    games = JSON.parse(store);
  }

  games.push(game);
  updatePlayerGames(game.id, game.players[0].id);
  localStorage.setItem(gamesStoreName, JSON.stringify(games));
  return game.id;
};

export const getGame = (id: string): Game | undefined => {
  let games: Game[] = [];
  const store = localStorage.getItem(gamesStoreName);
  if (store) {
    games = JSON.parse(store);
  }
  const game = games.find((game) => game.id === id);
  return game;
};

export const updateGame = (updatedGame: Game): boolean => {
  let games: Game[] = [];
  const store = localStorage.getItem('games');
  if (store) {
    games = JSON.parse(store);
  }
  const game = games.find((game) => game.id === updatedGame.id);

  if (!game) {
    console.log('Game not found');
    return false;
  }

  const res = games.map((game: Game) => {
    if (game.id === updatedGame.id) {
      return updatedGame;
    }
    return game;
  });
  console.log(res);
  localStorage.setItem('games', JSON.stringify(res));
  return true;
};

export const joinGame = (gameId: string, playerName: string): boolean => {
  let games: Game[] = [];
  const store = localStorage.getItem(gamesStoreName);
  if (store) {
    games = JSON.parse(store);
  }
  const joiningGame = games.find((game) => game.id === gameId);

  if (!joiningGame) {
    console.log('Game not found');
    return false;
  }
  const newPlayer = { name: playerName, id: ulid(), status: Status.NotStarted };
  joiningGame.players.push(newPlayer);

  const res = games.map((game: Game) => {
    if (game.id === gameId) {
      return joiningGame;
    }
    return game;
  });

  updatePlayerGames(gameId, newPlayer.id);
  localStorage.setItem(gamesStoreName, JSON.stringify(res));

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
