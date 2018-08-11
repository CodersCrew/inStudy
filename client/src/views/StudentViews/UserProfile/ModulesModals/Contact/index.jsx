import React from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'CC-UI';

const Contact = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    onClose={() => onClose()}
    title="Dodaj moduł Tekst"
    buttons={[
      {
        onClick: () => console.log('Go forward'),
        label: 'Dodaj',
      },
      {
        onClick: () => onClose(),
        label: 'Anuluj',
        kind: 'grey',
      },
    ]}
  >
    Lorem ipsum dolor sit amet.
  </Modal>
);

Contact.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired,
};

export default Contact;
