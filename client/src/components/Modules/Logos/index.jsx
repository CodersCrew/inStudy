import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Logos = ({ text }) => (
  <Container>{text}</Container>
);

Logos.propTypes = {
  text: string,
};

Logos.defaultProps = {
  text: 'Moduł loga',
};

export default Logos;
