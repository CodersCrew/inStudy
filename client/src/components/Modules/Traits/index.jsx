import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Traits = ({ text }) => (
  <Container>{text}</Container>
);

Traits.propTypes = {
  text: string,
};

Traits.defaultProps = {
  text: 'Moduł cechy',
};

export default Traits;
