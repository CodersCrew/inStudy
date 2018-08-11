import React from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'CC-UI';

const RichText = ({ visible, onClose }) => (
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
    {console.log(visible)}
    Lorem ipsum dolor sit amet.
  </Modal>
);

RichText.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired,
};

export default RichText;
