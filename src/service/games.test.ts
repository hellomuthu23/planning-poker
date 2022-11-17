/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    addNewGame,
    streamGame,
    streamPlayers,
    getGame,
    updateGame,
    resetGame,
    finishGame,
    getAverage,
    getGameStatus,
    updateGameStatus,
} from './games';

jest.mock('ulid', () => ({ ulid: () => '321cba' }));

describe('games service', () => {
    it.skip('should store the new game info in the DB', () => {
        expect(true).toBe(false);
    });

    it.skip('should request the given game\'s stream', () => {
        expect(true).toBe(false);
    });

    it.skip('should request the given player\'s stream', () => {
        expect(true).toBe(false);
    });

    it.skip('should get the game from the DB', () => {
        expect(true).toBe(false);
    });

    it.skip('should update the game in the DB', () => {
        expect(true).toBe(false);
    });
    
    describe('reset the game', () => {
        it.skip('should update the game and reset the players', () => {
            expect(true).toBe(false);
        });

        it.skip('should not touch the DB if the game doesn\'t exist', () => {
            expect(true).toBe(false);
        });
    });
    
    describe('finish the game', () => {
        it.skip('update the game with the average and finished status', () => {
            expect(true).toBe(false);
        });

        it.skip('should not touch the DB if the game doesn\'t exist', () => {
            expect(true).toBe(false);
        });
    });
    
    describe('get the average vote', () => {
        it.skip('should provide the average of players\' votes', () => {
            expect(true).toBe(false);
        });

        it.skip('should not calculate players who have not finished', () => {
            expect(true).toBe(false);
        });
    });
    
    describe('get the game status', () => {
        it.skip('should have started status when there\'s some players who have finished', () => {
            expect(true).toBe(false);
        });

        it.skip('should be in progress when there\'s no players that have finished', () => {
            expect(true).toBe(false);
        });
    });
    
    describe('update the game status', () => {
        it.skip('should not touch the DB if the game doesn\'t exist', () => {
            expect(true).toBe(false);
        });

        it.skip('should return false if there are no players in the game in the DB', () => {
            expect(true).toBe(false);
        });

        it.skip('should update the game with the new status', () => {
            expect(true).toBe(false);
        });
    });
})