import React from 'react';
import { array, func } from 'prop-types';
import AddModule from './AddModule';

const ModulesModals = ({ openedModalNames, openModal, closeModal }) => (
  <AddModule visible={openedModalNames.includes('AddModule')} onClose={closeModal} />
);

ModulesModals.propTypes = {
  openedModalNames: array.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
};

export default ModulesModals;
