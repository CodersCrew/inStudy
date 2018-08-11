import React from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'CC-UI';
import modulesConfig from '../../modulesConfig';

const AddModule = ({ visible, onClose, openModal }) => (
  <Modal
    visible={visible}
    onClose={onClose}
    title="Dodaj moduł do profilu"
    type="complex"
    buttons={[
      {
        onClick: onClose,
        label: 'Anuluj',
        kind: 'warning',
      },
    ]}
  >
    {Object.keys(modulesConfig).map(key => (
      <div
        onClick={() => {
          openModal(key);
          onClose();
        }}
      >
        {key}
      </div>
    ))}
  </Modal>
);

AddModule.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired,
  openModal: func.isRequired,
};

export default AddModule;
