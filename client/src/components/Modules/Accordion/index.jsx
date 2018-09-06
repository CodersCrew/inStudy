import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Accordion = ({ text }) => (
  <Container>{text}</Container>
);

Accordion.propTypes = {
  text: string,
};

Accordion.defaultProps = {
  text: 'Moduł lista rozwijana',
};

export default Accordion;
