import { isNumeric } from './isStringNumeric';

describe('isModerator', () => {
  it('"1" must be numeric', () => {
    const result = isNumeric('1');

    expect(result).toBe(true);
  });

  it('"2" must be numeric', () => {
    const result = isNumeric('2');

    expect(result).toBe(true);
  });

  it('"0" must be numeric', () => {
    const result = isNumeric('0');

    expect(result).toBe(true);
  });


  it('"-1" must be numeric', () => {
    const result = isNumeric('-1');

    expect(result).toBe(true);
  });

  it('"1.0" must be numeric', () => {
    const result = isNumeric('1.0');

    expect(result).toBe(true);
  });

  it('"1 1" must not be numeric', () => {
    const result = isNumeric('1 1');

    expect(result).toBe(false);
  });


  it('"z" must not be numeric', () => {
    const result = isNumeric('z');

    expect(result).toBe(false);
  });

  it('"1b" must not be numeric', () => {
    const result = isNumeric('1b');

    expect(result).toBe(false);
  });
});
