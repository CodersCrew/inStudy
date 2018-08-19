import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

class Contatct extends PureComponent {
  render() {
    return (
      <Container>{this.props.text}</Container>
    );
  }
}

Contatct.propTypes = {
  text: string,
};

Contatct.defaultProps = {
  text: 'Contact',
};

export default Contatct;
