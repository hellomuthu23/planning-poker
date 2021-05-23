import { Status } from './status';

export interface Player {
  name: string;
  id: string;
  status: Status;
  value?: number;
  emoji?: string;
}

export interface PlayerGame {
  gameId: string;
  playerId: string;
}
