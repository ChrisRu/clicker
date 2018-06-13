import * as React from 'react';
import styled from 'styled-components';
import { formatAmount } from './utils';

interface IProps {
  amount: number;
  generates: number;
}

const StatusWrapper = styled.div`
  width: 40em;
`;

const StatusAmount = styled.h1`
  margin: 0;
`;

const StatusGenerates = styled.h2`
  margin: 0 0 0.5em;
  font-size: 1.1em;
  opacity: 0.8;
`;

class Status extends React.Component<IProps> {
  render() {
    const { amount, generates } = this.props;

    return (
      <StatusWrapper>
        <StatusAmount>{formatAmount(amount)} blobbers</StatusAmount>
        <StatusGenerates>{formatAmount(generates)} a second</StatusGenerates>
      </StatusWrapper>
    );
  }
}

export default Status;
