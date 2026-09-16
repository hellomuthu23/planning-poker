import { fibonacciCards, shortFibonacciCards } from './CardConfigs';

describe('CardConfigs', () => {
  describe('shortFibonacciCards', () => {
    it('should keep numeric value in sync with displayValue so averages reflect what is shown', () => {
      shortFibonacciCards
        .filter((card) => card.value >= 0)
        .forEach((card) => {
          expect(card.value).toEqual(Number(card.displayValue.replace('½', '0.5')));
        });
    });

    it('should use the short Fibonacci sequence (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)', () => {
      const values = shortFibonacciCards.filter((card) => card.value >= 0).map((card) => card.value);
      expect(values).toEqual([0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100]);
    });
  });

  describe('fibonacciCards', () => {
    it('should keep numeric value in sync with displayValue', () => {
      fibonacciCards
        .filter((card) => card.value >= 0)
        .forEach((card) => {
          expect(card.value).toEqual(Number(card.displayValue));
        });
    });
  });
});
