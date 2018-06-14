import * as React from 'react';
import styled from 'styled-components';

const Cookie = styled.button`
  border-radius: 50%;
  width: 15em;
  height: 15em;
  border: 0;
  outline: none;
  background: #85617d;
  box-shadow: inset -1.5em -1.5em 0 rgba(69, 77, 140, 1), 0 2px 8px rgba(69, 77, 140, 0.4);
  transition: transform 0.05s ease-in-out, box-shadow 0.2s ease;
  transform: scale(1);
  margin-top: 0.5em;

  &:hover {
    transform: scale(1.025);
    box-shadow: inset -1em -1em 0 rgba(69, 77, 140, 1), 0 2px 12px rgba(69, 77, 140, 0.6);
  }

  &:active {
    transform: scale(1.05);
    box-shadow: inset -0.7em -0.7em 0 rgba(69, 77, 140, 1), 0 2px 16px rgba(69, 77, 140, 0.8);
  }

  @media (max-width: 36rem) {
    margin: 0.5em auto 2em;
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
