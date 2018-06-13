import * as React from 'react';
import Clicker from './Clicker';
import Status from './Status';
import BuyMenu from './BuyMenu';
import { calc } from './utils';
import styled from 'styled-components';

export interface IItem {
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

interface IState {
  amount: number;
  generates: number;
  items: IItem[];
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
    generates: 0,
    items: createItems()
  };

  componentDidMount() {
    this.load();

    this.interval = setInterval(() => {
      this.setState(({ amount, generates }) => ({
        amount: calc('+', amount, generates)
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  click = () => {
    this.setState(
      ({ amount }) => ({
        amount: calc('+', amount, 1)
      }),
      this.save
    );
  };

  generate = (worth: number, cost: number) => {
    this.setState(
      ({ amount, generates }) => ({
        amount: calc('-', amount, cost),
        generates: calc('+', generates, worth)
      }),
      this.save
    );
  };

  load() {
    const status = window.localStorage.getItem('blobbers');
    if (status) {
      this.setState(JSON.parse(status));
    }
  }

  save() {
    window.localStorage.setItem('blobbers', JSON.stringify(this.state));
  }

  render() {
    const { amount, generates, items } = this.state;

    return (
      <Wrapper>
        <SideBar>
          <Status amount={amount} generates={generates} />
          <Clicker onClick={this.click} />
        </SideBar>
        <BuyMenu items={items} amount={amount} onUpdate={this.generate} />
      </Wrapper>
    );
  }
}

export default App;
