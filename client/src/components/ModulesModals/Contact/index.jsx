import React, { PureComponent } from 'react';
import ModalBase from '../ModalBase';
import { getModalBaseData } from '../userModalsUtils';
import { Text } from './styles';

class Contatct extends PureComponent {
  render() {
    return (
      <ModalBase {...getModalBaseData(this.props)}>
        <Text>
          Ten moduł nie wymaga dodatkowej konfiguracji. Wszystkie maile będą wysyłane na adres ustawiony w profilu.
        </Text>
      </ModalBase>
    );
  }
}

export default Contatct;
