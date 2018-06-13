import * as React from 'react';
import styled from 'styled-components';
import { formatAmount } from './utils';
import { IItem } from './App';

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
  items: IItem[];
}

class BuyMenu extends React.Component<IProps> {
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
    const { amount, items } = this.props;

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
