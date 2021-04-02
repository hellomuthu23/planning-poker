export interface Game {
  players: Player[];
  gameName: string;
  id: number;
  description?: string;
  winner: Player | null;
  gameStatus: Status;
}

export enum Status {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Finished = 'Finished',
}

export interface Player {
  name: string;
  id: number;
  status: Status;
  value?: number;
}
