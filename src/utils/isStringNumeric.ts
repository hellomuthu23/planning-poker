export const isNumeric = (incomingNumber: string | number) => {
  if (typeof incomingNumber !== 'string' && typeof incomingNumber !== 'number') return false;
  if (typeof incomingNumber === 'string' && incomingNumber.trim() === '') return false;
  const number = Number(incomingNumber);
  return Number.isFinite(number);
};