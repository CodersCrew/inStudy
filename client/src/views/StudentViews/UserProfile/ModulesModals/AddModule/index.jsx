import React from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'react-ui-framework';

const AddModule = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    onClose={() => onClose('AddModule')}
    title="Dodaj moduł do profilu"
    buttons={[
      {
        onClick: () => console.log('Go forward'),
        label: 'Dodaj',
      },
      {
        onClick: () => onClose('AddModule'),
        label: 'Anuluj',
        kind: 'grey',
      },
    ]}
  >
    Lorem ipsum dolor sit amet.
  </Modal>
);

AddModule.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired,
};

export default AddModule;
