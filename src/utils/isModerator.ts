export const isModerator = (moderatorId: string, currentPlayerId: string | undefined) => {
  return moderatorId === currentPlayerId;
};