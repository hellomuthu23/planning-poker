import { GameType } from '../../../types/game';

export interface CardConfig {
  value: number;
  displayValue: string;
  color: string;
}
export const fibonacciCards: CardConfig[] = [
  { value: 0, displayValue: '0', color: '#e7edf3' },
  { value: 1, displayValue: '1', color: '#9EC8FE' },
  { value: 2, displayValue: '2', color: '#9EC8FE' },
  { value: 3, displayValue: '3', color: '#A3DFF2' },
  { value: 5, displayValue: '5', color: '#A3DFF2' },
  { value: 8, displayValue: '8', color: '#9DD49A' },
  { value: 13, displayValue: '13', color: '#9DD49A' },
  { value: 21, displayValue: '21', color: '#F4DD94' },
  { value: 34, displayValue: '34', color: '#F4DD94' },
  { value: 55, displayValue: '55', color: '#F39893' },
  { value: 89, displayValue: '89', color: '#F39893' },
  { value: -2, displayValue: '❓', color: '#e7edf3' },
  { value: -1, displayValue: '-1', color: '#e7edf3' },
];

export const shortFibonacciCards: CardConfig[] = [
  { value: 0, displayValue: '0', color: '#e7edf3' },
  { value: 0.5, displayValue: '½', color: '#9EC8FE' },
  { value: 1, displayValue: '1', color: '#9EC8FE' },
  { value: 2, displayValue: '2', color: '#9EC8FE' },
  { value: 3, displayValue: '3', color: '#A3DFF2' },
  { value: 5, displayValue: '5', color: '#A3DFF2' },
  { value: 8, displayValue: '8', color: '#9DD49A' },
  { value: 13, displayValue: '13', color: '#9DD49A' },
  { value: 21, displayValue: '20', color: '#F4DD94' },
  { value: 34, displayValue: '40', color: '#F4DD94' },
  { value: 55, displayValue: '100', color: '#F39893' },
  { value: -2, displayValue: '❓', color: '#e7edf3' },
  { value: -1, displayValue: '-1', color: '#e7edf3' },
];

export const tShirtCards: CardConfig[] = [
  { value: 10, displayValue: 'XXS', color: '#e7edf3' },
  { value: 20, displayValue: 'XS', color: '#9EC8FE' },
  { value: 30, displayValue: 'S', color: '#9EC8FE' },
  { value: 40, displayValue: 'M', color: '#A3DFF2' },
  { value: 50, displayValue: 'L', color: '#A3DFF2' },
  { value: 60, displayValue: 'XL', color: '#9DD49A' },
  { value: 70, displayValue: 'XXL', color: '#9DD49A' },
  { value: -2, displayValue: '❓', color: '#e7edf3' },
  { value: -1, displayValue: '-1', color: '#e7edf3' },
];

export const tShirtAndNumbersCards: CardConfig[] = [
  { value: 10, displayValue: 'S', color: '#9EC8FE' },
  { value: 20, displayValue: 'M', color: '#9EC8FE' },
  { value: 30, displayValue: 'L', color: '#A3DFF2' },
  { value: 40, displayValue: 'XL', color: '#A3DFF2' },
  { value: 50, displayValue: '1', color: '#9DD49A' },
  { value: 60, displayValue: '2', color: '#9DD49A' },
  { value: 70, displayValue: '3', color: '#F4DD94' },
  { value: 80, displayValue: '4', color: '#F4DD94' },
  { value: 90, displayValue: '5', color: '#F39893' },
];

export const customCardsTemplate: CardConfig[] = [
  { value: 0, displayValue: '0', color: '#e7edf3' },
  { value: 1, displayValue: '1', color: '#9EC8FE' },
  { value: 2, displayValue: '2', color: '#9EC8FE' },
  { value: 3, displayValue: '3', color: '#A3DFF2' },
  { value: 4, displayValue: '4', color: '#A3DFF2' },
  { value: 5, displayValue: '5', color: '#9DD49A' },
  { value: 6, displayValue: '6', color: '#9DD49A' },
  { value: 7, displayValue: '7', color: '#F4DD94' },
  { value: 8, displayValue: '8', color: '#F4DD94' },
  { value: 9, displayValue: '9', color: '#F39893' },
  { value: 10, displayValue: '10', color: '#F39893' },
  { value: 11, displayValue: '11', color: '#D96C6C' },
  { value: 12, displayValue: '12', color: '#D96C6C' },
  { value: 13, displayValue: '13', color: '#9B59B6' },
  { value: 14, displayValue: '14', color: '#9B59B6' },
];

export const getCards = (gameType: GameType | undefined): CardConfig[] => {
  switch (gameType) {
    case GameType.Fibonacci:
      return fibonacciCards;
    case GameType.ShortFibonacci:
      return shortFibonacciCards;
    case GameType.TShirt:
      return tShirtCards;
    case GameType.TShirtAndNumber:
      return tShirtAndNumbersCards;
    case GameType.Custom:
      return customCardsTemplate;
    default:
      return fibonacciCards;
  }
};

export const getRandomEmoji = () => {
  const emojis = [
    '☕',
    '🥤',
    '🍹',
    '🍸',
    '🍧',
    '🍨',
    '🍩',
    '🍎',
    '🧁',
    '🍪',
    '🍿',
    '🌮',
    '🍦',
    '🍉',
    '🍐',
    '🍰',
    '🍫',
  ];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const getCustomCards = (values: string[]) => {
  const customCards: CardConfig[] = customCardsTemplate;
  values.forEach((value, index) => (customCards[index].displayValue = value));

  return customCards.filter(
    (card) => card.displayValue !== undefined && card.displayValue.trim() !== '',
  );
};
