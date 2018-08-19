import React from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'CC-UI';
import modulesConfig from '../../modulesConfig';
import Item from './Item';
import { Container, Label, Modules } from './styles';

const AddModule = ({ visible, onClose, openModal }) => (
  <Modal
    visible={visible}
    onClose={onClose}
    title="Dodaj moduł do profilu"
    type="complex"
    width={644}
    buttons={[
      {
        onClick: onClose,
        label: 'Anuluj',
        kind: 'grey',
      },
    ]}
  >
    <Container>
      <Label>Moduły statyczne</Label>
      <Modules>
        {Object.keys(modulesConfig).map(key => (
          <Item
            key={key}
            data={{ ...modulesConfig[key], key }}
            openModal={openModal}
            onClose={onClose}
          />
        ))}
      </Modules>
    </Container>
  </Modal>
);

AddModule.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired,
  openModal: func.isRequired,
};

export default AddModule;
