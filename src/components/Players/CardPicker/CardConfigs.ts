import { GameType } from "../../../types/game";

export interface CardConfig {
  value: number;
  displayValue: string;
  color: string;
}

export const hoursSevenCards: CardConfig[] = [
  { value: 0, displayValue: "0", color: "var(--color-background-secondary)" },
  { value: 0.5, displayValue: "½", color: "#9EC8FE" },
  { value: 1, displayValue: "1", color: "#9EC8FE" },
  { value: 2, displayValue: "2", color: "#A3DFF2" },
  { value: 4, displayValue: "4", color: "#A3DFF2" },
  { value: 7, displayValue: "7", color: "#9DD49A" },
  { value: 14, displayValue: "14", color: "#9DD49A" },
  { value: 21, displayValue: "21", color: "#F4DD94" },
  { value: 35, displayValue: "35", color: "#F4DD94" },
  { value: 56, displayValue: "56", color: "#F39893" },
  { value: 70, displayValue: "70", color: "#F39893" },
  { value: -2, displayValue: "❓", color: "var(--color-background-secondary)" },
  { value: -1, displayValue: "-1", color: "var(--color-background-secondary)" },
];

export const fibonacciCards: CardConfig[] = [
  { value: 0, displayValue: "0", color: "var(--color-background-secondary)" },
  { value: 1, displayValue: "1", color: "#9EC8FE" },
  { value: 2, displayValue: "2", color: "#9EC8FE" },
  { value: 3, displayValue: "3", color: "#A3DFF2" },
  { value: 5, displayValue: "5", color: "#A3DFF2" },
  { value: 8, displayValue: "8", color: "#9DD49A" },
  { value: 13, displayValue: "13", color: "#9DD49A" },
  { value: 21, displayValue: "21", color: "#F4DD94" },
  { value: 34, displayValue: "34", color: "#F4DD94" },
  { value: 55, displayValue: "55", color: "#F39893" },
  { value: 89, displayValue: "89", color: "#F39893" },
  { value: -2, displayValue: "❓", color: "var(--color-background-secondary)" },
  { value: -1, displayValue: "-1", color: "var(--color-background-secondary)" },
];

export const shortFibonacciCards: CardConfig[] = [
  { value: 0, displayValue: "0", color: "var(--color-background-secondary)" },
  { value: 0.5, displayValue: "½", color: "#9EC8FE" },
  { value: 2, displayValue: "2", color: "#9EC8FE" },
  { value: 3, displayValue: "3", color: "#A3DFF2" },
  { value: 5, displayValue: "5", color: "#A3DFF2" },
  { value: 8, displayValue: "8", color: "#9DD49A" },
  { value: 13, displayValue: "13", color: "#9DD49A" },
  { value: 20, displayValue: "20", color: "#F4DD94" },
  { value: 40, displayValue: "40", color: "#F4DD94" },
  { value: 100, displayValue: "100", color: "#F39893" },
  { value: -2, displayValue: "❓", color: "var(--color-background-secondary)" },
  { value: -1, displayValue: "-1", color: "var(--color-background-secondary)" },
];

export const tShirtCards: CardConfig[] = [
  {
    value: 10,
    displayValue: "XXS",
    color: "var(--color-background-secondary)",
  },
  { value: 20, displayValue: "XS", color: "#9EC8FE" },
  { value: 30, displayValue: "S", color: "#9EC8FE" },
  { value: 40, displayValue: "M", color: "#A3DFF2" },
  { value: 50, displayValue: "L", color: "#A3DFF2" },
  { value: 60, displayValue: "XL", color: "#9DD49A" },
  { value: 70, displayValue: "XXL", color: "#9DD49A" },
  { value: -2, displayValue: "❓", color: "var(--color-background-secondary)" },
  { value: -1, displayValue: "-1", color: "var(--color-background-secondary)" },
];

export const getCards = (gameType: GameType | undefined): CardConfig[] => {
  switch (gameType) {
    case GameType.HoursSevenCards:
      return hoursSevenCards;
    case GameType.Fibonacci:
      return fibonacciCards;
    case GameType.ShortFibonacci:
      return shortFibonacciCards;
    case GameType.TShirt:
      return tShirtCards;
    default:
      return fibonacciCards;
  }
};

export const getRandomEmoji = () => {
  const emojis = [
    "☕",
    "🥤",
    "🍹",
    "🍸",
    "🍧",
    "🍨",
    "🍩",
    "🍎",
    "🧁",
    "🍪",
    "🍿",
    "🌮",
    "🍦",
    "🍉",
    "🍐",
    "🍰",
    "🍫",
  ];
  return emojis[Math.floor(Math.random() * emojis.length)];
};
