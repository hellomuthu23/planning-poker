import { Status } from './status';

export interface Game {
  id: string;
  name: string;
  average: number;
  gameStatus: Status;
  createdBy: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface NewGame {
  name: string;
  createdBy: string;
  createdAt: Date;
}
