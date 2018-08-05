import React from 'react';
import { func } from 'prop-types';
import { Container } from './styles';

const EmptyState = ({ openModal }) => (
  <Container onClick={() => openModal('AddModule')}>
    Kliknij aby dodać pierwszy moduł do swojego profilu
  </Container>
);

EmptyState.propTypes = {
  openModal: func.isRequired,
};

export default EmptyState;
