import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';
import { Container } from './styles';

class Traits extends PureComponent {
  render() {
    return (
      <ModalBase {...getModalBaseData(this.props)} contentHeader="Tekst wewnątrz modułu">
        <Container>{this.props.text}</Container>
      </ModalBase>
    );
  }
}

Traits.propTypes = {
  text: string,
};

Traits.defaultProps = {
  text: 'Traits',
};

export default Traits;
