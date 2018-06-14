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
  readonly increaseRate: number;

  constructor({
    name,
    namePlural,
    generates,
    initialCost,
    increaseRate = 1.15
  }: {
    name: string;
    namePlural: string;
    generates: number;
    initialCost: number;
    increaseRate?: number;
  }) {
    this.name = name;
    this.namePlural = namePlural;
    this.generates = generates;
    this.initialCost = initialCost;
    this.increaseRate = increaseRate;
  }

  calculateCost = (count: number): number => {
    return Math.round(this.initialCost * this.increaseRate ** count);
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
    generates: 0.5,
    initialCost: 100
  }),
  new Buyable({
    name: 'farm',
    namePlural: 'farms',
    generates: 4,
    initialCost: 500
  }),
  new Buyable({
    name: 'factory',
    namePlural: 'factories',
    generates: 10,
    initialCost: 3000
  }),
  new Buyable({
    name: 'mine',
    namePlural: 'mines',
    generates: 40,
    initialCost: 10000
  }),
  new Buyable({
    name: 'laboratory',
    namePlural: 'laboratories',
    generates: 100,
    initialCost: 40000
  }),
  new Buyable({
    name: 'plant',
    namePlural: 'plants',
    generates: 400,
    initialCost: 200000
  }),
  new Buyable({
    name: 'planet',
    namePlural: 'planets',
    generates: 5000,
    initialCost: 1500000
  }),
  new Buyable({
    name: 'aliens',
    namePlural: 'alien species',
    generates: 100000,
    initialCost: 100000000
  }),
  new Buyable({
    name: 'magic',
    namePlural: 'magics',
    generates: 1000000,
    initialCost: 4000000000
  })
];

export interface IItemStatus {
  amount: number;
}
