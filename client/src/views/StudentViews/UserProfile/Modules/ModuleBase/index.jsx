import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Container, Header, Icon, Text } from './styles';

class ModuleBase extends PureComponent {
  render() {
    return (
      <Container>
        <Header>
          <Icon className={`fal fa-${this.props.icon}`} />
          <Text>{this.props.title}</Text>
        </Header>
      </Container>
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
