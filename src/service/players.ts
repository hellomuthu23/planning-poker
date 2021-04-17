import { ulid } from 'ulid';
import {
  addPlayerToGameInStore,
  getGameFromStore,
  getPlayerFromStore,
  getPlayersFromStore,
  updatePlayerInStore,
} from '../repository/firebase';
import { Game } from '../types/game';
import { Player, PlayerGame } from '../types/player';
import { Status } from '../types/status';
import { updateGameStatus } from './games';

const playerGamesStoreName = 'playerGames';

export const addPlayer = async (gameId: string, player: Player) => {
  const game = await getGameFromStore(gameId);
  if (game) {
    addPlayerToGameInStore(gameId, player);
  }
};

export const updatePlayerValue = async (
  gameId: string,
  playerId: string,
  value: number
) => {
  const player = await getPlayerFromStore(gameId, playerId);

  if (player) {
    const updatedPlayer = {
      ...player,
      value: value,
      status: Status.Finished,
    };
    await updatePlayerInStore(gameId, updatedPlayer);
    await updateGameStatus(gameId);
    return true;
  }
  return false;
};

export const getPlayerRecentGames = async (): Promise<Game[]> => {
  let playerGames: PlayerGame[] = [];
  let games: Game[] = [];
  const store = localStorage.getItem(playerGamesStoreName);

  if (store) {
    playerGames = JSON.parse(store);
  }

  await Promise.all(
    playerGames.map(async (playerGame: PlayerGame) => {
      const game = await getGameFromStore(playerGame.gameId);
      game && games.push(game);
    })
  );

  games.sort((a: Game, b: Game) => +b.createdAt - +a.createdAt);
  return games;
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

export const updatePlayerGames = (gameId: string, playerId: string) => {
  let playerGames: PlayerGame[] = [];
  const store = localStorage.getItem(playerGamesStoreName);
  if (store) {
    playerGames = JSON.parse(store);
  }

  playerGames.push({ gameId, playerId });
  localStorage.setItem(playerGamesStoreName, JSON.stringify(playerGames));
};

export const addPlayerToGame = async (
  gameId: string,
  playerName: string
): Promise<boolean> => {
  const joiningGame = await getGameFromStore(gameId);

  if (!joiningGame) {
    console.log('Game not found');
    return false;
  }
  const newPlayer = { name: playerName, id: ulid(), status: Status.NotStarted };

  updatePlayerGames(gameId, newPlayer.id);
  await addPlayerToGameInStore(gameId, newPlayer);

  return true;
};

export const resetPlayers = async (gameId: string) => {
  const players = await getPlayersFromStore(gameId);

  players.forEach(async (player) => {
    const updatedPlayer: Player = {
      ...player,
      status: Status.NotStarted,
      value: 0,
    };
    await updatePlayerInStore(gameId, updatedPlayer);
  });
};
