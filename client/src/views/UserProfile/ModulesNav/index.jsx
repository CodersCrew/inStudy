import React from 'react';
import { array, func } from 'prop-types';
import { Container, Icon } from './styles';

const createNavItem = module => {
  console.log(module);
  return null;
};

const ModulesNav = ({ modules, openModal }) => (
  <Container>
    {modules.map(createNavItem)}
    <Icon onClick={() => openModal('AddModule')}>
      <i className="fal fa-plus" />
    </Icon>
  </Container>
);

ModulesNav.propTypes = {
  modules: array,
  openModal: func.isRequired,
};

ModulesNav.defaultProps = {
  modules: [],
};

export default ModulesNav;
