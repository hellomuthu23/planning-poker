import { ulid } from 'ulid';
import {
  addPlayerToGameInStore,
  getGameFromStore,
  getPlayerFromStore,
  getPlayersFromStore,
  removePlayerFromGameInStore,
  updatePlayerInStore,
} from '../repository/firebase';
import { getPlayerGamesFromCache, updatePlayerGamesInCache } from '../repository/localStorage';
import { Player, PlayerGame } from '../types/player';
import { Status } from '../types/status';
import { updateGameStatus } from './games';
import { isModerator } from '../utils/isModerator';

export const addPlayer = async (gameId: string, player: Player) => {
  const game = await getGameFromStore(gameId);
  if (game) {
    addPlayerToGameInStore(gameId, player);
  }
};

export const removePlayer = async (gameId: string, playerId: string) => {
  const game = await getGameFromStore(gameId);
  if (game) {
    removePlayerFromGameInStore(gameId, playerId);
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
export const updatePlayerName = async (gameId: string, playerId: string, name: string) => {
  const player = await getPlayerFromStore(gameId, playerId);

  if (player) {
    const updatedPlayer = {
      ...player,
      name: name,
    };
    await updatePlayerInStore(gameId, updatedPlayer);
    return true;
  }
  return false;
};

export const getPlayerRecentGames = async (): Promise<PlayerGame[]> => {
  const playerGamesFromCache = getPlayerGamesFromCache();
  for (let playerGame of playerGamesFromCache) {
    const game = await getGameFromStore(playerGame.id);
    if (game) {
      playerGame.isLocked = game.isLocked;
      playerGame.existsInStore = true;
      playerGame.isModerator = isModerator(
        playerGame.createdById,
        getCurrentPlayerId(playerGame.id),
        playerGame.isAllowMembersToManageSession)
    } else {
      playerGame.existsInStore = false;
      playerGame.isModerator = true;
      playerGame.isLocked = false;
    }
  }
  return playerGamesFromCache;
};

export const getCurrentPlayerId = (gameId: string): string | undefined => {
  let playerGames: PlayerGame[] = getPlayerGamesFromCache();

  const game = playerGames.find((playerGame) => playerGame.id === gameId);

  return game && game.playerId;
};

export const updatePlayerGames = (
  gameId: string,
  gameName: string,
  createdBy: string,
  createdById: string,
  playerId: string,
) => {
  let playerGames: PlayerGame[] = getPlayerGamesFromCache();

  playerGames.push({ id: gameId, name: gameName, createdById: createdById, createdBy: createdBy, playerId });

  updatePlayerGamesInCache(playerGames);
};

export const isCurrentPlayerInGame = async (gameId: string): Promise<boolean> => {
  const playerGames = getPlayerGamesFromCache();
  const found = playerGames.find((playerGames) => playerGames.id === gameId);
  if (found) {
    const player = await getPlayerFromStore(found.id, found.playerId);

    //Remove game from cache is player is no longer in the game
    if (!player) {
      removeGameFromCache(found.id);
      return false;
    }
    return true;
  }
  return false;
};

export const isPlayerInGameStore = async (gameId: string, playerId: string) => {
  const player = await getPlayerFromStore(gameId, playerId);
  return !!player;
};

export const removeGameFromCache = (gameId: string) => {
  const playerGames = getPlayerGamesFromCache();
  updatePlayerGamesInCache(playerGames.filter((playerGame) => playerGame.id !== gameId));
};

export const addPlayerToGame = async (gameId: string, playerName: string): Promise<boolean> => {
  const joiningGame = await getGameFromStore(gameId);

  if (!joiningGame) {
    console.log('Game not found');
    return false;
  }
  const newPlayer = { name: playerName, id: ulid(), status: Status.NotStarted };

  updatePlayerGames(joiningGame.id, joiningGame.name, joiningGame.createdBy, joiningGame.createdById, newPlayer.id);
  await addPlayerToGameInStore(gameId, newPlayer);

  return true;
};

export const resetPlayers = async (gameId: string) => {
  const players = await getPlayersFromStore(gameId);

  players.forEach(async (player) => {
    const updatedPlayer: Player = {
      ...player,
      status: Status.NotStarted,
      value: -3,
    };
    await updatePlayerInStore(gameId, updatedPlayer);
  });
};
