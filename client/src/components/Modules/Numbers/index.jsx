import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Numbers = ({ text }) => (
  <Container>{text}</Container>
);

Numbers.propTypes = {
  text: string,
};

Numbers.defaultProps = {
  text: 'Moduł liczby',
};

export default Numbers;
