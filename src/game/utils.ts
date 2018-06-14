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

  if (value >= 1000000000) {
    newValue = calc('/', value, 1000000000) + ' B';
  } else if (value >= 1000000) {
    newValue = calc('/', value, 1000000) + ' M';
  } else if (value >= 1000) {
    newValue = calc('/', value, 1000) + ' K';
  }

  return newValue.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const nameToUppercase = (name: string) =>
  name.charAt(0).toUpperCase() + name.substring(1, name.length);

export class Buyable {
  readonly name: string;
  readonly namePlural: string;
  readonly generates: number;
  readonly initialCost: number;

  constructor({
    name,
    namePlural,
    generates,
    initialCost
  }: {
    name: string;
    namePlural: string;
    generates: number;
    initialCost: number;
  }) {
    this.name = name;
    this.namePlural = namePlural;
    this.generates = generates;
    this.initialCost = initialCost;
  }

  calculateCost = (count: number): number => {
    return Math.round(this.initialCost * 1.2 ** count);
  };
}

export const Buyables: ReadonlyArray<Buyable> = [
  new Buyable({
    name: 'nephew',
    namePlural: 'nephews',
    generates: 0.1,
    initialCost: 15
  }),
  new Buyable({
    name: 'grandma',
    namePlural: 'grannies',
    generates: 1,
    initialCost: 50
  }),
  new Buyable({
    name: 'farm',
    namePlural: 'farms',
    generates: 2,
    initialCost: 500
  }),
  new Buyable({
    name: 'factory',
    namePlural: 'factories',
    generates: 5,
    initialCost: 1000
  }),
  new Buyable({
    name: 'mine',
    namePlural: 'mines',
    generates: 10,
    initialCost: 10000
  }),
  new Buyable({
    name: 'plant',
    namePlural: 'plants',
    generates: 50,
    initialCost: 100000
  }),
  new Buyable({
    name: 'planet',
    namePlural: 'planets',
    generates: 100,
    initialCost: 1000000
  }),
  new Buyable({
    name: 'aliens',
    namePlural: 'alien species',
    generates: 1000,
    initialCost: 100000000
  })
];

export interface IItemStatus {
  amount: number;
}
