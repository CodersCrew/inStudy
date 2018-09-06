import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const People = ({ text }) => (
  <Container>{text}</Container>
);

People.propTypes = {
  text: string,
};

People.defaultProps = {
  text: 'Moduł osoby',
};

export default People;
