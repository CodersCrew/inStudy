import React, { PureComponent, Fragment } from 'react';
import { array, func } from 'prop-types';
import AddModule from './AddModule';
import modulesConfig from '../modulesConfig';

class ModulesModals extends PureComponent {
  renderModal = (key, { name, icon, modal: Modal }) => {
    return (
      <Modal
        key={key}
        name={name}
        icon={icon}
        visible={this.props.openedModalNames.includes(key)}
        onClose={() => this.props.closeModal(key)}
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
        {Object.keys(modulesConfig).map(key => this.renderModal(key, modulesConfig[key]))}
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
