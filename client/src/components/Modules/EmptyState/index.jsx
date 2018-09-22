import React from 'react';
import { func } from 'prop-types';
import { Container } from './styles';

const EmptyState = ({ addModule }) => (
  <Container onClick={addModule}>
    Kliknij aby dodać pierwszy moduł do swojego profilu
  </Container>
);

EmptyState.propTypes = {
  addModule: func.isRequired,
};

export default EmptyState;
