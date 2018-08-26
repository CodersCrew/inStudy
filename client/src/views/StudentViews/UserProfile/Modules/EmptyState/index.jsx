import React from 'react';
import { func, number } from 'prop-types';
import { Container } from './styles';

const EmptyState = ({ openModal, modulesCount }) => (
  <Container onClick={() => openModal('AddModule')}>
    {modulesCount > 0
      ? '+ Dodaj kolejny moduł'
      : '+ Kliknij aby dodać pierwszy moduł do swojego profilu'}
  </Container>
);

EmptyState.propTypes = {
  modulesCount: number.isRequired,
  openModal: func.isRequired,
};

export default EmptyState;
