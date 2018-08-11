import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

class ModuleBase extends PureComponent {
  render() {
    return (
      <Container>{this.props.text}</Container>
    );
  }
}

ModuleBase.propTypes = {
  text: string,
};

ModuleBase.defaultProps = {
  text: 'Hello World',
};

export default ModuleBase;
