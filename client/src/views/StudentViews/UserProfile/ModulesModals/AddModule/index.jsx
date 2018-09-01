import React from 'react';
import { bool, func } from 'prop-types';
import { ComplexModal } from 'components';
import modulesConfig from '../../modulesConfig';
import Item from './Item';
import { Container, Label, Modules } from './styles';

const AddModule = ({ visible, onClose, openModal }) => (
  <ComplexModal
    visible={visible}
    onCancel={onClose}
    title="Dodaj moduł do profilu"
    iconClass="fal fa-phone"
    width={644}
    buttons={[
      {
        key: 'cancel',
        onClick: onClose,
        label: 'Anuluj',
      },
    ]}
  >
    <Container>
      <Label>Moduły statyczne</Label>
      <Modules>
        {Object.keys(modulesConfig).map(key => (
          <Item key={key} data={{ ...modulesConfig[key], key }} openModal={openModal} onClose={onClose} />
        ))}
      </Modules>
    </Container>
  </ComplexModal>
);

AddModule.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired,
  openModal: func.isRequired,
};

export default AddModule;
