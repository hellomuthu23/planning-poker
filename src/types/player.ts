import { Status } from './status';

export interface Player {
  name: string;
  id: string;
  status: Status;
  value?: number;
  emoji?: string;
}

export interface PlayerGame {
  id: string;
  name: string;
  createdById: string;
  createdBy: string;
  playerId: string;
}
