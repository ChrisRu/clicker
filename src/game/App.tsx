import * as React from 'react';
import Clicker from './Clicker';
import Status from './Status';
import BuyMenu from './BuyMenu';
import { calc, IItemStatus, Buyables } from './utils';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  @media (max-width: 36rem) {
    flex-flow: column nowrap;
    justify-content: flex-start;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 18rem;
  margin-right: 1em;

  @media (max-width: 36rem) {
    margin-right: 0;
    justify-content: flex-start;
    text-align: center;
  }
`;

export interface IState {
  bought: { [x: string]: IItemStatus };
  blobbers: number;
  generates: number;
}

class App extends React.Component<{}, IState> {
  private interval: NodeJS.Timer;

  state = App.loadInitialState() || App.generateInitialState();

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ blobbers, generates }) => ({
        blobbers: calc('+', blobbers, generates)
      }));
    }, 1000);
  }

  componentDidUpdate() {
    window.localStorage.setItem('blobbers', JSON.stringify(this.state));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  click = () => {
    this.setState(({ blobbers }) => ({
      blobbers: calc('+', blobbers, 1)
    }));
  };

  buy = (bought: { [x: string]: IItemStatus }, cost: number) => {
    this.setState(
      ({ blobbers }) => ({
        bought,
        blobbers: calc('-', blobbers, cost)
      }),
      this.updateGenerates
    );
  };

  updateGenerates() {
    this.setState(({ bought }) => ({
      generates: Buyables.reduce(
        (generates, buyable) =>
          calc('+', calc('*', bought[buyable.name].amount, buyable.generates), generates),
        0
      )
    }));
  }

  static loadInitialState() {
    const status = window.localStorage.getItem('blobbers');
    if (status) {
      try {
        return JSON.parse(status) as IState;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  static generateInitialState() {
    return {
      bought: Buyables.reduce(
        (bought, buyable) => ({
          ...bought,
          [buyable.name]: { amount: 0 }
        }),
        {}
      ),
      blobbers: 0,
      generates: 0
    } as IState;
  }

  render() {
    const { blobbers, generates, bought } = this.state;

    return (
      <Wrapper>
        <LeftSide>
          <Status blobbers={blobbers} generates={generates} />
          <Clicker onClick={this.click} />
        </LeftSide>
        <BuyMenu bought={bought} blobbers={blobbers} onBuy={this.buy} />
      </Wrapper>
    );
  }
}

export default App;
