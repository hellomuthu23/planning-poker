import { isModerator } from './isModerator';

describe('isModerator', () => {
  it('should return true if the currentPlayerId matches the moderatorId', () => {
    const moderatorId = 'moderator123';
    const currentPlayerId = 'moderator123';
    const isAllowMembersToManageSession = false;

    const result = isModerator(moderatorId, currentPlayerId, isAllowMembersToManageSession);

    expect(result).toBe(true);
  });

  it('should return false if the currentPlayerId does not match the moderatorId', () => {
    const moderatorId = 'moderator123';
    const currentPlayerId = 'player456';
    const isAllowMembersToManageSession = false;

    const result = isModerator(moderatorId, currentPlayerId, isAllowMembersToManageSession);

    expect(result).toBe(false);
  });

  it('should return false if isAllowMembersToManageSession is false', () => {
    const moderatorId = 'moderator123';
    const currentPlayerId = 'player456';
    const isAllowMembersToManageSession = false;

    const result = isModerator(moderatorId, currentPlayerId, isAllowMembersToManageSession);

    expect(result).toBe(false);
  });
  it('should return false if isAllowMembersToManageSession is undefined', () => {
    const moderatorId = 'moderator123';
    const currentPlayerId = 'player456';
    const isAllowMembersToManageSession = undefined;

    const result = isModerator(moderatorId, currentPlayerId, isAllowMembersToManageSession);

    expect(result).toBe(false);
  });
  it('should return true if isAllowMembersToManageSession is true', () => {
    const moderatorId = 'moderator123';
    const currentPlayerId = 'moderator123';
    const isAllowMembersToManageSession = true;

    const result = isModerator(moderatorId, currentPlayerId, isAllowMembersToManageSession);

    expect(result).toBe(true);
  });
});
