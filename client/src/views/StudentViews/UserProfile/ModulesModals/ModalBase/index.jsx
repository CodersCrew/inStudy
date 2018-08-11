import React from 'react';
import { bool, func, string } from 'prop-types';
import { Modal } from 'CC-UI';

const RichText = ({ visible, onClose, key, name, icon, Content }) => (
  <Modal
    visible={visible}
    onClose={onClose}
    title={`Dodaj moduł "${name}"`}
    icon={`/fa-icons/${icon}-light.svg`}
    type="complex"
    width={644}
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
    <Content />
  </Modal>
);

RichText.propTypes = {
  name: string.isRequired,
  key: string.isRequired,
  icon: string.isRequired,
  visible: bool.isRequired,
  onClose: func.isRequired,
};

export default RichText;
