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
    resetPlayers
} from './players';
import * as fb from '../repository/firebase';
import * as storage from '../repository/localStorage';
import * as games from './games';
import { Status } from '../types/status';

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
        createdBy: 'Creatornado',
        createdById: '123-abc',
        createdAt: new Date(),
    };

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
        it('update the player in store and in the game\'s status if the player exists', async () => {
            const spyPlayer = jest.spyOn(fb, 'updatePlayerInStore');
            const spyGame = jest.spyOn(games, 'updateGameStatus');
            const emoji = 'emeowticon';
            jest.spyOn(fb, 'getPlayerFromStore').mockResolvedValueOnce(mockPlayer);

            await updatePlayerValue(mockGame.id, mockPlayer.id, 3, emoji);
            
            expect(spyPlayer).toHaveBeenCalledWith(mockGame.id, expect.objectContaining({value: 3, emoji }))
            expect(spyGame).toHaveBeenCalledWith(mockGame.id);
        });

        // NOTE: Shouldn't there be a case that the player doesn't get updated if the game doesn't exist?
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
        it('should return sorted list of games for the player', async () => {
            // Older game 1 minute ago
            const olderMockGame = { ...mockGame, id: 'older', createdAt: new Date(Date.now() - 60000) };
            const newerMockGame = { ...mockGame, id: 'newer', createdAt: new Date() };
            const mockPlayerGames = [
                { gameId: newerMockGame.id, playerId: mockPlayer.id },
                { gameId: olderMockGame.id, playerId: mockPlayer.id }
            ];
            jest.spyOn(storage, 'getPlayerGamesFromCache').mockReturnValueOnce(mockPlayerGames);
            jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(olderMockGame).mockResolvedValueOnce(newerMockGame);
            jest.spyOn(fb, 'getPlayerFromStore').mockResolvedValueOnce(mockPlayer);

            const games = await getPlayerRecentGames();

            expect(games).toHaveLength(2);
            expect(games[0].id).toEqual('older');
            expect(games[1].id).toEqual('newer');
        });

        it('should only return games that are in store if there\'s extra games in cache', async () => {
            expect(true).toBe(false);
        });

        it('should return an empty list if there are no games', async () => {
            expect(true).toBe(false);
        });
    });

    describe('get current player ID using the game ID', () => {
        it('should return the player ID if the game exists', async () => {
            expect(true).toBe(false);
        });

        it('should return false if the game doesn\'t exist', async () => {
            expect(true).toBe(false);
        });
    });

    describe('update player\'s games', () => {
        it('should add a new game to the list of games', async () => {
            expect(true).toBe(false);
        });
    });

    describe('check if the current player is in the game', () => {
        it('returns false when the player has no games with the given ID', async () => {
            expect(true).toBe(false);
        });
    
        it('returns false when the player is not in the game according to DB', async () => {
            expect(true).toBe(false);
        });
        
        it('returns true when the player is in game in both cache and DB', async () => {
            expect(true).toBe(false);
        });
    });

    describe('check if player is in this game in the DB', () => {
        it('should return true when the player\'s in the game', async () => {
            expect(true).toBe(false);
        });
    
        it('should return false when the player\'s not in the game', async () => {
            expect(true).toBe(false);
        });
    });

    describe('remove the given game from cache', () => {
        it('should not modify cache if the given game is not in there', async () => {
            expect(true).toBe(false);
        });
    
        it('should update the cache with a new list without the given game', async () => {
            expect(true).toBe(false);
        });
    });

    describe('add a player to the given game', () => {
        it('should return false if the game does not exist', async () => {
            expect(true).toBe(false);
        });
    
        it('should update the cache and DB with the new game for the player', async () => {
            expect(true).toBe(false);
        });
    });

    describe('reset players\' statuses', () => {
        it('should update all players for a game in the DB', async () => {
            expect(true).toBe(false);
        });
    });
});