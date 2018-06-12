type operation = '*' | '-' | '+' | '/';

export const calc = (op: operation, x: number, y: number) => {
  const n = {
    '*': x * y,
    '-': x - y,
    '+': x + y,
    '/': x / y
  }[op];

  return Math.round(n * 100) / 100;
};

export const formatAmount = (value: number) => {
  let newValue = value.toString();

  if (value > 10e9) {
    newValue = calc('/', value, 10e9) + ' B';
  } else if (value > 10e6) {
    newValue = calc('/', value, 10e6) + ' M';
  } else if (value > 10e3) {
    newValue = calc('/', value, 10e6) + ' K';
  }

  return newValue.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};
