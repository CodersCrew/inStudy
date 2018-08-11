import React from 'react';
import { array, func } from 'prop-types';
import modulesConfig from '../modulesConfig';
import { Container, Icon, AddIcon } from './styles';

const createNavItem = module => {
  console.log(modulesConfig[module.type].icon);
  return (
    <Icon>
      <i className={`fal fa-${modulesConfig[module.type].icon}`} />
    </Icon>
  );
};

const ModulesNav = ({ modules, openModal }) => (
  <Container>
    {modules.map(createNavItem)}
    <AddIcon onClick={() => openModal('AddModule')}>
      <i className="fal fa-plus" />
    </AddIcon>
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
