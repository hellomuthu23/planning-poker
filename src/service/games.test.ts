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
import * as fb from '../repository/firebase';
import * as players from './players';
import * as ul from 'ulid';
import { Status } from '../types/status';
import { GameType } from '../types/game';

jest.mock('../repository/firebase', () => ({
    addGameToStore: jest.fn(),
    addPlayerToGameInStore: jest.fn(),
    streamData: jest.fn(),
    streamPlayersFromStore: jest.fn(),
    getGameFromStore: jest.fn(),
    updateGameDataInStore: jest.fn(),
    getPlayersFromStore: jest.fn(),
}));
jest.mock('./players', () => ({
    resetPlayers: jest.fn(),
    updatePlayerGames: jest.fn(),
}));
jest.mock('ulid', () => ({ ulid: () => '321cba' }));

describe('games service', () => {
    const mockUlid = '321cba';
    const mockId = 'fancy pants';
    const mockGame = {
        id: 'fee-fii-foo-fum',
        name: 'Cadburys',
        average: 2,
        gameStatus: Status.NotStarted,
        gameType: GameType.Fibonacci,
        createdBy: 'Jack',
        createdById: 'beanstalk',
        createdAt: new Date(Date.now() - 60000),
        updatedAt: new Date(),
    };
    const mockPlayers = [
        { name: 'Jack', id: 'beanstalk', status: Status.Finished, value: 4, emoji: 'smirk' },
        { name: 'Jill', id: 'hill', status: Status.Started, value: 1, emoji: 'thumbsup' },
        { name: 'Humpty', id: 'dumpty', status: Status.InProgress, value: 500, emoji: 'egg' },
    ];
    const finishedPlayers = [ { ...mockPlayers[0] }, { ...mockPlayers[1] }, { ...mockPlayers[2] } ];
    finishedPlayers[0].status = Status.Finished;
    finishedPlayers[1].status = Status.Finished;
    finishedPlayers[2].status = Status.Finished;

    it('should store the new game info in the DB', async () => {
        const fakeGame = { name: 'cherries', gameType: 'uno', createdBy: 'Santa', createdAt: new Date() };
        const resPlayer = { name: fakeGame.createdBy, id: mockUlid, status: Status.NotStarted };
        const resGame = { ...fakeGame, id: mockUlid, average: 0, createdById: mockUlid, gameStatus: Status.Started };
        const gameSpy = jest.spyOn(fb, 'addGameToStore');
        const playerSpy = jest.spyOn(fb, 'addPlayerToGameInStore');
        const updateSpy = jest.spyOn(players, 'updatePlayerGames');

        const id = await addNewGame(fakeGame);

        expect(id).toEqual(mockUlid);
        expect(gameSpy).toHaveBeenCalledWith(mockUlid, resGame);
        expect(playerSpy).toHaveBeenCalledWith(mockUlid, resPlayer);
        expect(updateSpy).toHaveBeenCalledWith(mockUlid, mockUlid); // Game ID and player ID
    });

    it('should request the given game\'s stream', () => {
        const spy = jest.spyOn(fb, 'streamData');

        streamGame(mockId);

        expect(spy).toHaveBeenCalledWith(mockId);
    });

    it('should request the given player\'s stream', () => {
        const spy = jest.spyOn(fb, 'streamPlayersFromStore');

        streamPlayers(mockId);

        expect(spy).toHaveBeenCalledWith(mockId);
    });

    it('should get the game from the DB', () => {
        const spy = jest.spyOn(fb, 'getGameFromStore');

        getGame(mockId);

        expect(spy).toHaveBeenCalledWith(mockId);
    });

    it('should update the game in the DB', () => {
        const spy = jest.spyOn(fb, 'updateGameDataInStore');

        updateGame(mockId, 'banana');

        expect(spy).toHaveBeenCalledWith(mockId, 'banana');
    });
    
    describe('reset the game', () => {
        it('should update the game and reset the players', async () => {
            const expectGame = { average: 0, gameStatus: Status.Started };
            jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(mockGame);
            const updateSpy = jest.spyOn(fb, 'updateGameDataInStore');
            const playerSpy = jest.spyOn(players, 'resetPlayers');

            await resetGame(mockId);

            expect(updateSpy).toHaveBeenCalledWith(mockId, expectGame);
            expect(playerSpy).toHaveBeenCalledWith(mockId);
        });

        it('should not touch the DB if the game doesn\'t exist', async () => {
            jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(undefined);
            const updateSpy = jest.spyOn(fb, 'updateGameDataInStore');
            const playerSpy = jest.spyOn(players, 'resetPlayers');

            await resetGame(mockId);

            expect(updateSpy).toHaveBeenCalledTimes(0);
            expect(playerSpy).toHaveBeenCalledTimes(0);
        });
    });
    
    describe('finish the game', () => {
        it('update the game with the average and finished status', async () => {
            jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(mockGame);
            jest.spyOn(fb, 'getPlayersFromStore').mockResolvedValueOnce(mockPlayers);
            const spy = jest.spyOn(fb, 'updateGameDataInStore');

            await finishGame(mockId);

            expect(spy).toHaveBeenCalledWith(mockId, expect.objectContaining({ gameStatus: Status.Finished }));
        });

        it('should not touch the DB if the game doesn\'t exist', async () => {
            jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(undefined);
            jest.spyOn(fb, 'getPlayersFromStore').mockResolvedValueOnce(mockPlayers);
            const spy = jest.spyOn(fb, 'updateGameDataInStore');

            await finishGame(mockId);

            expect(spy).toHaveBeenCalledTimes(0);
        });
    });
    
    describe('get the average vote', () => {
        it('should provide the average of players\' votes', () => {
            // This is required because JS is weird with its copying VS referencing
            const expected = Math.round((finishedPlayers[0].value + finishedPlayers[1].value + finishedPlayers[2].value) / 3);

            const res = getAverage(finishedPlayers);

            expect(res).toEqual(expected);
        });

        it('should not calculate players who have not finished', () => {
            const res = getAverage(mockPlayers);

            expect(res).toEqual(mockPlayers[0].value);
        });
    });
    
    describe('get the game status', () => {
        it('should have in progress status when there\'s some players who have finished', () => {
            const res = getGameStatus(mockPlayers);

            expect(res).toEqual(Status.InProgress);
        });

        it('should be started when there\'s no players that have finished', () => {
            const fakePlayers = [mockPlayers[1], mockPlayers[2]];

            const res = getGameStatus(fakePlayers);

            expect(res).toEqual(Status.Started);
        });
    });
    
    describe('update the game status', () => {
        it('should not touch the DB if the game doesn\'t exist', async () => {
            jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(undefined);

            const res = await updateGameStatus(mockId);

            expect(res).toBe(false);
        });

        it('should return false if there are no players in the game in the DB', async () => {
            jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(mockGame);
            // @ts-ignore
            jest.spyOn(fb, 'getPlayersFromStore').mockResolvedValueOnce(undefined);

            const res = await updateGameStatus(mockId);

            expect(res).toBe(false);
        });

        it('should update the game with the new status', async () => {
            jest.spyOn(fb, 'getGameFromStore').mockResolvedValueOnce(mockGame);
            jest.spyOn(fb, 'getPlayersFromStore').mockResolvedValueOnce(mockPlayers);
            const spy = jest.spyOn(fb, 'updateGameDataInStore');

            const res = await updateGameStatus(mockId);

            expect(spy).toHaveBeenCalledWith(mockId, { gameStatus: Status.InProgress });
        });
    });
})