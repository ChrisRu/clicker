import * as React from 'react';
import styled from 'styled-components';
import { formatAmount } from './utils';

interface IItem {
  name: string;
  generates: number;
  cost: number;
  amount: number;
}

const createItems = (): IItem[] => [
  {
    name: 'Mouse',
    generates: 0.1,
    cost: 15,
    amount: 0
  },
  {
    name: 'Grandma',
    generates: 1,
    cost: 50,
    amount: 0
  },
  {
    name: 'Factory',
    generates: 2,
    cost: 500,
    amount: 0
  },
  {
    name: 'Factory Farm',
    generates: 5,
    cost: 1000,
    amount: 0
  },
  {
    name: 'Mine',
    generates: 10,
    cost: 10000,
    amount: 0
  }
];

const BuyItems = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 2;
`;

const BuyItem = styled.button`
  display: block;
  margin: 0 0 0.5em;
  padding: 0.5em 1em;
  display: flex;
  font-size: 1rem;
  border: 0;
  outline: none;
  border-radius: 3px;
  font-family: 'Work Sans', sans-serif;
  background: #fff;
  color: #000;

  &:disabled {
    opacity: 0.5;
    color: #fff;
    background: initial;
  }
`;

const BuyTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  margin-right: 1em;
`;

interface IProps {
  onUpdate: (worth: number, cost: number) => void;
  amount: number;
}

interface IState {
  items: IItem[];
}

class BuyMenu extends React.Component<IProps, IState> {
  state = {
    items: createItems()
  };

  calculateCost({ cost, amount }: IItem) {
    return Math.round(cost * 1.2 ** amount);
  }

  buy = (item: IItem, cost: number) => (event: React.MouseEvent) => {
    event.preventDefault();

    const { onUpdate } = this.props;
    item.amount++;
    onUpdate(item.generates, cost);
  };

  render() {
    const { amount } = this.props;
    const { items } = this.state;

    return (
      <BuyItems>
        {items.map(item => {
          const cost = this.calculateCost(item);

          return (
            <BuyItem
              key={item.name}
              disabled={cost > amount}
              onClick={this.buy(item, cost)}>
              <BuyTitle>{item.name}</BuyTitle>
              <span>${formatAmount(cost)}</span>
            </BuyItem>
          );
        })}
      </BuyItems>
    );
  }
}

export default BuyMenu;
