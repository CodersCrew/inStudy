import React, { PureComponent, Fragment } from 'react';
import { array, func } from 'prop-types';
import AddModule from './AddModule';
import modulesConfig from '../modulesConfig';

class ModulesModals extends PureComponent {
  renderModal = name => {
    const modalData = modulesConfig[name];
    const Modal = modalData.modalContent;
    console.log(modalData);
    return (
      <Modal
        key={name}
        name={modalData.name}
        icon={modalData.icon}
        type={name}
        visible
        onClose={() => this.props.closeModal(name)}
      />
    );
  };

  render() {
    const { openedModalNames, openModal, closeModal } = this.props;

    return (
      <Fragment>
        <AddModule
          visible={openedModalNames.includes('AddModule')}
          onClose={() => closeModal('AddModule')}
          openModal={openModal}
        />
        {!openedModalNames.includes('AddModule') && openedModalNames.length
          ? this.renderModal(openedModalNames[0])
          : null}
      </Fragment>
    );
  }
}

ModulesModals.propTypes = {
  openedModalNames: array.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
};

export default ModulesModals;
