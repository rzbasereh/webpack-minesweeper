const isInteger = (value: string | number) => {
  if (typeof value === 'number') return Number.isInteger(value) && !Number.isNaN(value);
  if (typeof value !== 'string') return false;

  const num = Number(value);
  if (Number.isInteger(num) && !Number.isNaN(value)) {
    return true;
  }

  return false;
};

export default isInteger;
