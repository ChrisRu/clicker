import * as React from 'react';
import styled from 'styled-components';

const Cookie = styled.button`
  border-radius: 50%;
  width: 15em;
  height: 15em;
  border: 0;
  outline: none;
  background: #85617d;
  box-shadow: inset 0 -1.5em 0 rgba(69, 77, 140, 1), 0 2px 8px rgba(69, 77, 140, 0.4);
  transition: transform 0.05s ease-in-out, box-shadow 0.2s ease;
  transform: scale(1) rotate(-30deg);
  margin-top: 0.5em;

  &:hover {
    transform: scale(1.025) rotate(-30deg);
    box-shadow: inset 0 -1em 0 rgba(69, 77, 140, 1), 0 2px 12px rgba(69, 77, 140, 0.6);
  }

  &:active {
    transform: scale(1.05) rotate(-30deg);
    box-shadow: inset 0 -0.7em 0 rgba(69, 77, 140, 1), 0 2px 16px rgba(69, 77, 140, 0.8);
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
