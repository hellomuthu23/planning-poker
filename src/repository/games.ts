import { ulid } from 'ulid';
import { Game, NewGame } from '../types/game';
import { Status } from '../types/status';

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
  const store = localStorage.getItem('games');
  if (store) {
    games = JSON.parse(store);
  }

  games.push(game);
  localStorage.setItem('games', JSON.stringify(games));
  return game.id;
};

export const getGame = (id: string): Game | undefined => {
  let games: Game[] = [];
  const store = localStorage.getItem('games');
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
  const store = localStorage.getItem('games');
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

  localStorage.setItem('games', JSON.stringify(res));
  return true;
};
