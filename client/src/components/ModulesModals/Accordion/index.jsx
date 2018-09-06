import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';
import { Container } from './styles';

class Accordion extends PureComponent {
  render() {
    return (
      <ModalBase {...getModalBaseData(this.props)} contentHeader="Tekst wewnątrz modułu">
        <Container>{this.props.text}</Container>
      </ModalBase>
    );
  }
}

Accordion.propTypes = {
  text: string,
};

Accordion.defaultProps = {
  text: 'Accordion',
};

export default Accordion;
