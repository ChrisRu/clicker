import * as React from 'react';
import styled from 'styled-components';
import { formatAmount } from './utils';

const StatusAmount = styled.h1`
  margin: 0;
`;

const StatusGenerates = styled.h2`
  margin: 0 0 0.5em;
  font-size: 1.1em;
  opacity: 0.8;
`;

interface IProps {
  blobbers: number;
  generates: number;
}

class Status extends React.Component<IProps> {
  render() {
    const { blobbers, generates } = this.props;

    return (
      <React.Fragment>
        <StatusAmount>{formatAmount(blobbers)} blobbers</StatusAmount>
        <StatusGenerates>{formatAmount(generates)} a second</StatusGenerates>
      </React.Fragment>
    );
  }
}

export default Status;
