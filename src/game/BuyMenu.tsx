import * as React from 'react';
import styled from 'styled-components';
import { formatAmount, IItemStatus, Buyables, nameToUppercase, Buyable } from './utils';

const BuyItems = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`;

const BuyHoverInfo = styled.div`
  background: #282828;
  border-radius: 3px;
  position: absolute;
  left: 100%;
  top: -0.75em;
  max-width: 15em;
  color: #fff;
  display: none;
  padding: 0.5em;
  margin-left: 1.25em;
  z-index: 5;

  &::after {
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
  }

  @media (max-width: 36rem) {
    top: 3.5em;
    left: 0;

    &::after {
      top: -1.75em;
      left: 1.5em;
      border-right: 1em solid transparent;
      border-left: 1em solid transparent;
      border-bottom: 1em solid #282828;
    }
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
  background: rgba(255, 255, 255, 0.8);
  color: rgba(24, 24, 24, 0.8);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: box-shadow 0.1s ease, background 0.1s ease, color 0.1s ease, transform 0.1s ease;
  z-index: 5;

  &:not(:disabled):hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    color: #181818;
    background: #fff;
    transform: scale(1.05);
  }

  &:hover ${BuyHoverInfo} {
    display: block;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    background: initial;
    box-shadow: none;
  }
`;

const BuyTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  margin-right: 1em;
  width: 5.25em;
`;

interface IProps {
  bought: { [x: string]: IItemStatus };
  blobbers: number;
  onBuy: (buy: { [x: string]: IItemStatus }, cost: number) => void;
}

class BuyMenu extends React.Component<IProps> {
  buy = (bought: { [x: string]: IItemStatus }, buyable: Buyable) => (event: React.MouseEvent) => {
    event.preventDefault();

    const { onBuy } = this.props;
    const { amount } = bought[buyable.name];

    onBuy(
      {
        ...bought,
        [buyable.name]: { amount: amount + 1 }
      },
      buyable.calculateCost(amount)
    );
  };

  render() {
    const { blobbers, bought } = this.props;
    return (
      <BuyItems>
        {Buyables.map(buyable => {
          const { generates, name, namePlural } = buyable;
          const { amount } = bought[name];
          const cost = buyable.calculateCost(amount);

          return (
            <BuyItem key={name} disabled={cost > blobbers} onClick={this.buy(bought, buyable)}>
              <BuyTitle>{nameToUppercase(name)}</BuyTitle>
              <span>฿ {formatAmount(cost)}</span>
              <BuyHoverInfo>
                <p>Generates ฿{formatAmount(generates)}/s</p>
                <p>
                  You own {amount} {amount === 1 ? name : namePlural}
                </p>
              </BuyHoverInfo>
            </BuyItem>
          );
        })}
      </BuyItems>
    );
  }
}

export default BuyMenu;
