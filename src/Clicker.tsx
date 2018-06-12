import * as React from 'react';
import styled from 'styled-components';

const Cookie = styled.button`
  border-radius: 50%;
  width: 15em;
  height: 15em;
  border: 0;
  outline: none;
  background: #815fdc;
  box-shadow: 0 2px 8px rgba(200, 20, 20, 0.2);
  transition: background 0.1s ease, transform 0.1s ease-in-out;
  transform: scale(0.95);
  margin-top: 0.5em;

  &:hover {
    background: #7752d8;
    transform: scale(1);
  }

  &:active {
    background: #633ec5;
    transform: scale(1.05);
  }
`;

interface IProps {
  onClick: () => void;
}

class Clicker extends React.PureComponent<IProps> {
  render() {
    const { onClick } = this.props;

    return <Cookie onClick={onClick} />;
  }
}

export default Clicker;
