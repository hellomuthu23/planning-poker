import { Status } from './status';

export interface Player {
  name: string;
  id: string;
  status: Status;
  value?: number;
}
