import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Numbers = (props) => {
  console.log(props);
  return <Container>{props.text}</Container>;
};

Numbers.propTypes = {
  text: string,
};

Numbers.defaultProps = {
  text: 'Moduł liczby',
};

export default Numbers;
