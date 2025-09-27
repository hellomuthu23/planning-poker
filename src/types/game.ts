import { CardConfig } from '../components/Players/CardPicker/CardConfigs';
import { Status } from './status';

export interface TimerProps {
  currentSeconds?: number;
  totalSeconds?: number;
  soundOn?: boolean;
  timerVisible?: boolean;
  timerPaused?: boolean;
}
export interface Game {
  id: string;
  name: string;
  average: number;
  gameStatus: Status;
  gameType?: GameType | GameType.Fibonacci;
  isAllowMembersToManageSession?: boolean;
  storyName?: string;
  autoReveal?: boolean;
  cards: CardConfig[];
  createdBy: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: Date;
  timerProps?: TimerProps;
}

export interface NewGame {
  name: string;
  gameType: string;
  cards: CardConfig[];
  isAllowMembersToManageSession?: boolean;
  createdBy: string;
  createdAt: Date;
}

export enum GameType {
  Fibonacci = 'Fibonacci',
  ShortFibonacci = 'ShortFibonacci',
  TShirt = 'TShirt',
  TShirtAndNumber = 'TShirtAndNumber',
  Custom = 'Custom',
}
