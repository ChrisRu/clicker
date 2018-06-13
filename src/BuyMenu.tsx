import * as React from 'react';
import styled from 'styled-components';
import { formatAmount } from './utils';
import { IItem } from './App';

const BuyItems = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 2;
`;

const BuyInfo = styled.div`
  background: #282828;
  border-radius: 3px;
  position: absolute;
  left: 100%;
  top: -0.75em;
  width: auto;
  color: #fff;
  display: none;
  padding: 0.5em;
  margin-left: 1.25em;

  &::before {
    content: '';
    position: absolute;
    left: -0.75em;
    top: 0.75em;
    width: 0;
    height: 0;
    border-top: 1em solid transparent;
    border-bottom: 1em solid transparent;
    border-right: 1em solid #282828;
    clear: both;
  }

  p {
    margin: 0;
    white-space: nowrap;
    float: left;
  }
`;

const BuyItem = styled.button`
  display: block;
  position: relative;
  margin: 0 0 0.5em;
  padding: 0.5em 1em;
  display: flex;
  font-size: 1rem;
  border: 0;
  outline: none;
  border-radius: 3px;
  font-family: 'Work Sans', sans-serif;
  background: #fff;
  color: #181818;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: box-shadow 0.1s ease, opacity 0.1s ease, transform 0.1s ease;
  opacity: 0.8;

  &:not(:disabled):hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    opacity: 1;
    transform: scale(1.05);
  }

  &:hover ${BuyInfo} {
    display: block;
  }

  &:disabled {
    opacity: 0.5;
    color: #fff;
    background: initial;
    box-shadow: none;
  }
`;

const BuyTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  margin-right: 1em;
  width: 4.5em;
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
          const { name, nameMultiple, generates, amount: itemAmount } = item;
          const cost = this.calculateCost(item);

          return (
            <BuyItem
              key={name}
              disabled={cost > amount}
              onClick={this.buy(item, cost)}>
              <BuyTitle>{name}</BuyTitle>
              <span>฿ {formatAmount(cost)}</span>
              <BuyInfo>
                <p>Generates ฿{formatAmount(generates)}/s</p>
                <p>
                  You own {itemAmount}{' '}
                  {itemAmount === 1
                    ? name.charAt(0).toLowerCase() + name.substring(1, name.length)
                    : nameMultiple}
                </p>
              </BuyInfo>
            </BuyItem>
          );
        })}
      </BuyItems>
    );
  }
}

export default BuyMenu;
