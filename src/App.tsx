import * as React from 'react';
import Clicker from './Clicker';
import Status from './Status';
import BuyMenu from './BuyMenu';
import { calc } from './utils';
import styled from 'styled-components';

interface IState {
  amount: number;
  generates: number;
}

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 15rem;
  margin-right: 1em;
`;

class App extends React.Component<{}, IState> {
  private interval: NodeJS.Timer;

  state = {
    amount: 0,
    generates: 0
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ amount, generates }) => ({
        amount: calc('+', amount, generates)
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  click = () =>
    this.setState(({ amount }) => ({
      amount: calc('+', amount, 1)
    }));

  generate = (worth: number, cost: number) =>
    this.setState(({ amount, generates }) => ({
      amount: calc('-', amount, cost),
      generates: calc('+', generates, worth)
    }));

  render() {
    const { amount, generates } = this.state;

    return (
      <Wrapper>
        <SideBar>
          <Status amount={amount} generates={generates} />
          <Clicker onClick={this.click} />
        </SideBar>
        <BuyMenu amount={amount} onUpdate={this.generate} />
      </Wrapper>
    );
  }
}

export default App;
