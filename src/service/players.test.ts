import {
  addPlayer,
  removePlayer,
  updatePlayerValue,
  getPlayerRecentGames,
  getCurrentPlayerId,
  updatePlayerGames,
  isCurrentPlayerInGame,
  isPlayerInGameStore,
  removeGameFromCache,
  addPlayerToGame,
  resetPlayers,
} from './players';
import * as fb from '../repository/firebase';
import * as storage from '../repository/localStorage';
import * as games from './games';
import { Status } from '../types/status';
import { PlayerGame } from '../types/player';
import { Game } from '../types/game';

jest.mock('../repository/firebase', () => ({
  addPlayerToGameInStore: jest.fn(),
  getGameFromStore: jest.fn(),
  getPlayerFromStore: jest.fn(),
  getPlayersFromStore: jest.fn(),
  removePlayerFromGameInStore: jest.fn(),
  updatePlayerInStore: jest.fn(),
}));
jest.mock('../repository/localStorage', () => ({
  getPlayerGamesFromCache: jest.fn(),
  updatePlayerGamesInCache: jest.fn(),
}));
jest.mock('./games', () => ({ updateGameStatus: jest.fn() }));
jest.mock('ulid', () => ({ ulid: () => 'cinnamon rolls' }));
const fakeUlid = 'cinnamon rolls';

describe('Players service', () => {
  const mockPlayer = {
    name: 'Mockingbird',
    id: '123-abc',
    status: Status.Started,
  };
  const mockGame = {
    id: 'game-123',
    name: 'Mock Game',
    average: 3,
    gameStatus: Status.Started,
    cards: [
      { value: 1, displayValue: '1', color: 'red' },
      { value: 2, displayValue: '2', color: 'blue' },
      { value: 3, displayValue: '3', color: 'green' },
    ],
    createdBy: 'Creatornado',
    createdById: '123-abc',
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('add player to existing game', () => {
    it('should add a player if the game exists', async () => {
      const spy = jest.spyOn(fb, 'addPlayerToGameInStore');
      jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(mockGame);

      await addPlayer(mockGame.id, mockPlayer);

      expect(spy).toHaveBeenCalledWith(mockGame.id, mockPlayer);
    });

    it('should not add a player to store if the game does not exist', async () => {
      const spy = jest.spyOn(fb, 'addPlayerToGameInStore');
      jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(undefined);

      await addPlayer(mockGame.id, mockPlayer);

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove player', () => {
    it('should remove a player from an existing game', async () => {
      const spy = jest.spyOn(fb, 'removePlayerFromGameInStore');
      jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(mockGame);

      await removePlayer(mockGame.id, mockPlayer.id);

      expect(spy).toHaveBeenCalledWith(mockGame.id, mockPlayer.id);
    });

    it('should not remove a player if the game does not exist', async () => {
      const spy = jest.spyOn(fb, 'removePlayerFromGameInStore');
      jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(undefined);

      await removePlayer(mockGame.id, mockPlayer.id);

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('update player value', () => {
    it("update the player in store and in the game's status if the player exists", async () => {
      const spyPlayer = jest.spyOn(fb, 'updatePlayerInStore');
      const spyGame = jest.spyOn(games, 'updateGameStatus');
      const emoji = 'emeowticon';
      jest.spyOn(fb, 'getPlayerFromStore').mockResolvedValueOnce(mockPlayer);

      await updatePlayerValue(mockGame.id, mockPlayer.id, 3, emoji);

      expect(spyPlayer).toHaveBeenCalledWith(
        mockGame.id,
        expect.objectContaining({ value: 3, emoji }),
      );
      expect(spyGame).toHaveBeenCalledWith(mockGame.id);
    });

    // NOTE: Shouldn't there be a case that the player doesn't get updated if the game doesn't exist? Fn doesn't have that logix
    it('should not update the player if the player does not exist', async () => {
      const spyPlayer = jest.spyOn(fb, 'updatePlayerInStore');
      const spyGame = jest.spyOn(games, 'updateGameStatus');
      jest.spyOn(fb, 'getPlayerFromStore').mockResolvedValueOnce(undefined);

      await updatePlayerValue(mockGame.id, mockPlayer.id, 3, '');

      expect(spyPlayer).toHaveBeenCalledTimes(0);
      expect(spyGame).toHaveBeenCalledTimes(0);
    });
  });

  describe('get recent games for player', () => {
    // Older game 1 minute ago
    const olderMockGame = { ...mockGame, id: 'older', createdAt: new Date(Date.now() - 60000) };
    const newerMockGame = { ...mockGame, id: 'newer', createdAt: new Date() };
    const mockPlayerGames = [
      {
        id: newerMockGame.id,
        name: newerMockGame.name,
        createdBy: newerMockGame.createdBy,
        createdById: newerMockGame.createdById,
        playerId: mockPlayer.id,
      },
      {
        id: olderMockGame.id,
        name: olderMockGame.name,
        createdBy: olderMockGame.createdBy,
        createdById: olderMockGame.createdById,
        playerId: mockPlayer.id,
      },
    ];

    beforeEach(() => {
      jest
        .spyOn(fb, 'getPlayerFromStore')
        .mockResolvedValueOnce(mockPlayer)
        .mockResolvedValueOnce(mockPlayer);
    });

    it('should return sorted list of games for the player', async () => {
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockPlayerGames);
      jest
        .spyOn(fb, 'getGameFromStore')
        .mockResolvedValueOnce(olderMockGame)
        .mockResolvedValueOnce(newerMockGame);

      const games = await getPlayerRecentGames();

      expect(games).toHaveLength(2);
      expect(games[0].id).toEqual('newer');
      expect(games[1].id).toEqual('older');
    });

    it('should return an empty list if there are no games', async () => {
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce([]);

      const games = await getPlayerRecentGames();

      expect(games).toHaveLength(0);
    });
  });

  describe('get current player ID using the game ID', () => {
    it('should return the player ID if the game exists', () => {
      const mockPlayerGames: PlayerGame[] = [
        {
          id: mockGame.id,
          name: mockGame.name,
          createdBy: mockGame.createdBy,
          createdById: mockGame.createdById,
          playerId: mockPlayer.id,
        },
      ];
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockPlayerGames);

      const id = getCurrentPlayerId(mockGame.id);

      expect(id).toEqual(mockPlayer.id);
    });

    it("should return undefined if the game doesn't exist", () => {
      const mockPlayerGames: PlayerGame[] = [
        {
          id: 'banana',
          name: 'abc',
          createdBy: 'xsy',
          createdById: 'xsy',
          playerId: mockPlayer.id,
        },
      ];
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockPlayerGames);

      const id = getCurrentPlayerId(mockGame.id);

      expect(id).toBe(undefined);
    });
  });

  describe("update player's games", () => {
    it('should add a new game to the list of games', () => {
      const newGame: PlayerGame = {
        id: 'game',
        name: 'gameName',
        createdById: 'aaaId',
        createdBy: 'aaa',
        playerId: 'player',
      };
      const mockPlayerGames: PlayerGame[] = [
        {
          id: mockGame.id,
          name: mockGame.name,
          createdBy: mockGame.createdBy,
          createdById: mockGame.createdById,
          playerId: mockPlayer.id,
        },
      ];
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockPlayerGames);
      const spy = jest.spyOn(storage, 'updatePlayerGamesInCache');

      updatePlayerGames(
        newGame.id,
        newGame.name,
        newGame.createdBy,
        newGame.createdById,
        newGame.playerId,
      );

      expect(spy).toHaveBeenCalledWith(expect.arrayContaining([...mockPlayerGames, newGame]));
    });
  });

  describe('check if the current player is in the game', () => {
    // Older game 1 minute ago
    const olderMockGame = { ...mockGame, id: 'older', createdAt: new Date(Date.now() - 60000) };
    const newerMockGame = { ...mockGame, id: 'newer', createdAt: new Date() };
    const mockPlayerGames: PlayerGame[] = [
      {
        id: newerMockGame.id,
        name: newerMockGame.name,
        createdBy: newerMockGame.createdBy,
        createdById: newerMockGame.createdById,
        playerId: mockPlayer.id,
      },
      {
        id: olderMockGame.id,
        name: olderMockGame.name,
        createdBy: olderMockGame.createdBy,
        createdById: olderMockGame.createdById,
        playerId: mockPlayer.id,
      },
    ];

    it('returns false when the player has no games with the given ID', async () => {
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockPlayerGames);

      const found = await isCurrentPlayerInGame('bleh');

      expect(found).toBe(false);
    });

    it('returns false when the player is not in the game according to DB and removes the game from cache', async () => {
      // Have to do mocking twice because the removal requests the cache again
      jest
        .spyOn(storage, 'getPlayerGamesFromCache')
        .mockReturnValueOnce(mockPlayerGames)
        .mockReturnValueOnce(mockPlayerGames);
      jest.spyOn(fb, 'getPlayerFromStore').mockResolvedValueOnce(undefined);
      const spy = jest.spyOn(storage, 'updatePlayerGamesInCache');
      const newGames: PlayerGame[] = [
        {
          id: newerMockGame.id,
          name: newerMockGame.name,
          createdBy: newerMockGame.createdBy,
          createdById: newerMockGame.createdById,
          playerId: mockPlayer.id,
        },
      ];

      const found = await isCurrentPlayerInGame(olderMockGame.id);

      expect(spy).toHaveBeenCalledWith(expect.arrayContaining(newGames));
      expect(found).toBe(false);
    });

    it('returns true when the player is in game in both cache and DB', async () => {
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockPlayerGames);
      jest.spyOn(fb, 'getPlayerFromStore').mockResolvedValueOnce(mockPlayer);

      const found = await isCurrentPlayerInGame(newerMockGame.id);

      expect(found).toBe(true);
    });
  });

  describe('check if player is in this game in the DB', () => {
    it("should return true when the player's in the game", async () => {
      jest.spyOn(fb, 'getPlayerFromStore').mockResolvedValueOnce(mockPlayer);

      const res = await isPlayerInGameStore(mockGame.id, mockPlayer.id);

      expect(res).toBe(true);
    });

    it("should return false when the player's not in the game", async () => {
      jest.spyOn(fb, 'getPlayerFromStore').mockResolvedValueOnce(undefined);

      const res = await isPlayerInGameStore(mockGame.id, mockPlayer.id);

      expect(res).toBe(false);
    });
  });

  describe('remove the given game from cache', () => {
    it('should not modify cache if the given game is not in there', () => {
      const mockGames: PlayerGame[] = [
        {
          id: mockGame.id,
          name: mockGame.name,
          createdBy: mockGame.createdBy,
          createdById: mockGame.createdById,
          playerId: mockPlayer.id,
        },
      ];
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockGames);
      const spy = jest.spyOn(storage, 'updatePlayerGamesInCache');

      removeGameFromCache('banana');

      expect(spy).toHaveBeenCalledWith(mockGames);
    });

    it('should update the cache with a new list without the given game', () => {
      const mockPlayerGames: PlayerGame[] = [
        { id: 'one', name: 'ss', createdBy: 'acid', createdById: 'id', playerId: 'id' },
        { id: 'two', name: 'ss', createdBy: 'acid', createdById: 'id', playerId: 'id' },
      ];
      const filteredGames: PlayerGame[] = [
        { id: 'two', name: 'ss', createdBy: 'acid', createdById: 'id', playerId: 'id' },
      ];
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockPlayerGames);
      const spy = jest.spyOn(storage, 'updatePlayerGamesInCache');

      removeGameFromCache('one');

      expect(spy).toHaveBeenCalledWith(filteredGames);
    });
  });

  describe('add a player to the given game', () => {
    it('should return false if the game does not exist', async () => {
      jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(undefined);

      const res = await addPlayerToGame('foo', 'bar');

      expect(res).toBe(false);
    });

    it('should update the cache and DB with the new game for the player', async () => {
      const mockGames: PlayerGame[] = [
        {
          id: mockGame.id,
          name: mockGame.name,
          createdBy: mockGame.createdBy,
          createdById: mockGame.createdById,
          playerId: mockPlayer.id,
        },
      ];
      const newGame: Game = { ...mockGame, id: 'cream', name: 'cream', createdById: fakeUlid };
      const newPlayerGame: PlayerGame = {
        id: 'cream',
        name: 'cream',
        createdBy: mockGame.createdBy,
        createdById: fakeUlid,
        playerId: fakeUlid,
      };
      const newList = [mockGames[0], newPlayerGame];
      const fakeName = 'peach';
      const expected = { id: fakeUlid, name: fakeName, status: Status.NotStarted };
      jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(newGame);
      jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockGames);
      const cacheSpy = jest.spyOn(storage, 'updatePlayerGamesInCache');
      const dbSpy = jest.spyOn(fb, 'addPlayerToGameInStore');

      const res = await addPlayerToGame(newGame.id, fakeName);

      expect(cacheSpy).toHaveBeenCalledWith(newList);
      expect(dbSpy).toHaveBeenCalledWith(newGame.id, expect.objectContaining(expected));
      expect(res).toBe(true);
    });
  });

  describe("reset players' statuses", () => {
    it('should update all players for a game in the DB', async () => {
      const fakePlayers = [
        { id: 'one', name: 'potato', status: Status.Finished, value: 1 },
        { id: 'two', name: 'pea', status: Status.InProgress, value: 2 },
        { id: 'three', name: 'carrot', status: Status.Started, value: 3 },
      ];
      const expectedPlayers = [
        { id: 'one', name: 'potato', status: Status.NotStarted, value: 0 },
        { id: 'two', name: 'pea', status: Status.NotStarted, value: 0 },
        { id: 'three', name: 'carrot', status: Status.NotStarted, value: 0 },
      ];
      const gId = 'soup';
      jest.spyOn(fb, 'getPlayersFromStore').mockResolvedValueOnce(fakePlayers);
      const spy = jest.spyOn(fb, 'updatePlayerInStore');

      await resetPlayers(gId);

      expect(spy).toHaveBeenNthCalledWith(1, gId, expectedPlayers[0]);
      expect(spy).toHaveBeenNthCalledWith(2, gId, expectedPlayers[1]);
      expect(spy).toHaveBeenNthCalledWith(3, gId, expectedPlayers[2]);
    });
  });
});
