import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';
import { Container } from './styles';

class Logos extends PureComponent {
  render() {
    return (
      <ModalBase {...getModalBaseData(this.props)} contentHeader="Tekst wewnątrz modułu">
        <Container>{this.props.text}</Container>
      </ModalBase>
    );
  }
}

Logos.propTypes = {
  text: string,
};

Logos.defaultProps = {
  text: 'Logos',
};

export default Logos;
