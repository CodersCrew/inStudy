import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import ModulesConfig from '../../modulesConfig';
import { Container, Header, Icon, Text, Content } from './styles';

class ModuleBase extends PureComponent {
  render() {
    console.log(this.props);
    const ModuleComponent = ModulesConfig[this.props.type].module;
    return (
      <Container>
        <Header>
          <Icon className={`fal fa-${this.props.icon}`} />
          <Text>{this.props.title}</Text>
        </Header>
        <Content>
          <ModuleComponent {...this.props.content} />
        </Content>
      </Container>
    );
  }
}

ModuleBase.propTypes = {
  content: object.isRequired,
  icon: string.isRequired,
  title: string.isRequired,
  type: string.isRequired,
};

export default ModuleBase;
