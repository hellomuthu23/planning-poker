import { ulid } from 'ulid';
import {
  addPlayerToGameInStore,
  getGameFromStore,
  getPlayerFromStore,
  getPlayersFromStore,
  updatePlayerInStore,
} from '../repository/firebase';
import { getPlayerGamesFromCache, isGameInPlayerCache, updatePlayerGamesInCache } from '../repository/localStorage';
import { Game } from '../types/game';
import { Player, PlayerGame } from '../types/player';
import { Status } from '../types/status';
import { updateGameStatus } from './games';

export const addPlayer = async (gameId: string, player: Player) => {
  const game = await getGameFromStore(gameId);
  if (game) {
    addPlayerToGameInStore(gameId, player);
  }
};

export const updatePlayerValue = async (gameId: string, playerId: string, value: number, randomEmoji: string) => {
  const player = await getPlayerFromStore(gameId, playerId);

  if (player) {
    const updatedPlayer = {
      ...player,
      value: value,
      emoji: randomEmoji,
      status: Status.Finished,
    };
    await updatePlayerInStore(gameId, updatedPlayer);
    await updateGameStatus(gameId);
    return true;
  }
  return false;
};

export const getPlayerRecentGames = async (): Promise<Game[]> => {
  let playerGames: PlayerGame[] = getPlayerGamesFromCache();
  let games: Game[] = [];

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
  let playerGames: PlayerGame[] = getPlayerGamesFromCache();

  const game = playerGames.find((playerGame) => playerGame.gameId === gameId);

  return game && game.playerId;
};

export const updatePlayerGames = (gameId: string, playerId: string) => {
  let playerGames: PlayerGame[] = getPlayerGamesFromCache();

  playerGames.push({ gameId, playerId });

  updatePlayerGamesInCache(playerGames);
};

export const isCurrentPlayerInGame = (gameId: string): boolean => {
  return isGameInPlayerCache(gameId);
};

export const addPlayerToGame = async (gameId: string, playerName: string): Promise<boolean> => {
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
